import { useEffect, useRef } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';

import type { AppDispatch, RootState } from '../store';
import { fetchLanguages } from '../store/languagesSlice';
import { setSearchYear } from '../store/filterSlice';
import { LanguageCard } from '../components/LanguageCard';

import 'react-datepicker/dist/react-datepicker.css';
import './GridPage.css';

const MIN_YEAR = -2000;
const MAX_YEAR = new Date().getFullYear();

const yearDate = (year: number) => {
  const date = new Date();

  // Работает с отрицательными годами и годами от 1 до 99.
  date.setFullYear(year, 0, 1);
  date.setHours(0, 0, 0, 0);

  return date;
};

const formatYear = (year: number) =>
  year < 0 ? `${Math.abs(year)} до н. э.` : String(year);

export const GridPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { items, loading, error } = useSelector(
    (state: RootState) => state.languages,
  );

  const { searchYear } = useSelector(
    (state: RootState) => state.filters,
  );

  const picker = useRef<DatePicker>(null);
  const field = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchLanguages(searchYear));
  }, [dispatch, searchYear]);

  useEffect(() => {
    const element = field.current;
    if (!element) return;

    let lastScroll = 0;

    const scrollYears = (event: WheelEvent) => {
      const calendar = picker.current?.calendar;

      if (
        !picker.current?.isCalendarOpen() ||
        !calendar ||
        !event.deltaY
      ) {
        return;
      }

      if (
        !(event.target instanceof Node) ||
        !calendar.containerRef.current?.contains(event.target)
      ) {
        return;
      }

      event.preventDefault();

      // Чтобы тачпад не перелистывал слишком быстро.
      if (Date.now() - lastScroll < 100) return;
      lastScroll = Date.now();

      const year = calendar.state.date.getFullYear();
      const next = year + (event.deltaY > 0 ? -12 : 12);

      calendar.changeYear(
        Math.max(MIN_YEAR, Math.min(MAX_YEAR, next)),
      );
    };

    element.addEventListener('wheel', scrollYears, {
      passive: false,
    });

    return () => {
      element.removeEventListener('wheel', scrollYears);
    };
  }, []);

  return (
    <div className="grid-page">
      <style>{`
        .glotto-year-field .react-datepicker-wrapper {
          width: 100%;
        }

        .glotto-year-field input {
          cursor: pointer;
        }

        .glotto-year-field .react-datepicker-popper {
          z-index: 1100;
        }

        .glotto-year-calendar {
          border-radius: 10px;
          overflow: hidden;
        }

        .glotto-year-calendar .react-datepicker__year-wrapper {
          max-width: 17rem;
        }

        .glotto-year-calendar .react-datepicker__year-text {
          width: 5rem;
          padding: 7px 0;
          font-size: 13px;
        }

        .glotto-year-calendar .glotto-zero-year {
          visibility: hidden;
        }
      `}</style>

      <h2>Все языки</h2>

      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          ref={field}
          className="glotto-year-field"
          style={{ flex: 1, minWidth: 0 }}
        >
          <DatePicker
            ref={picker}
            selected={
              searchYear ? yearDate(Number(searchYear)) : null
            }
            onChange={(date: Date | null) => {
              if (!date) {
                dispatch(setSearchYear(''));
                return;
              }

              const year = date.getFullYear();

              if (year !== 0) {
                dispatch(setSearchYear(String(year)));
              }
            }}
            showYearPicker
            yearItemNumber={12}
            minDate={yearDate(MIN_YEAR)}
            maxDate={yearDate(MAX_YEAR)}
            dateFormat="u"
            value={
              searchYear ? formatYear(Number(searchYear)) : ''
            }
            placeholderText="Выбрать год"
            onChangeRaw={event => event?.preventDefault()}
            calendarClassName="glotto-year-calendar"
            popperPlacement="bottom-start"
            shouldCloseOnSelect
            previousYearAriaLabel="Предыдущие годы"
            nextYearAriaLabel="Следующие годы"
            yearClassName={date =>
              date.getFullYear() === 0 ? 'glotto-zero-year' : ''
            }
            renderYearContent={year => (
              <span>
                {Math.abs(year)}

                <small
                  style={{
                    display: 'block',
                    fontSize: 10,
                  }}
                >
                  {year < 0 ? 'до н. э.' : 'н. э.'}
                </small>
              </span>
            )}
          />
        </div>

        <Button
          onClick={() => dispatch(setSearchYear(''))}
          disabled={!searchYear}
          style={{
            background: '#93358D',
            border: 'none',
            borderRadius: 8,
          }}
        >
          Сбросить
        </Button>
      </div>

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <div className="text-danger">{error}</div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center text-muted mt-5">
          По вашему запросу ничего не найдено.
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid-container">
          {items.map(item => (
            <LanguageCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
