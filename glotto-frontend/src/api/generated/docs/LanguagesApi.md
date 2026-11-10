# LanguagesApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiSwadeshListsDraftGet**](#apiswadeshlistsdraftget) | **GET** /api/swadesh-lists/draft | Черновик текущего пользователя|
|[**apiSwadeshListsFeedGet**](#apiswadeshlistsfeedget) | **GET** /api/swadesh-lists/feed | Лента языков|
|[**apiSwadeshListsGet**](#apiswadeshlistsget) | **GET** /api/swadesh-lists | Список опубликованных языков|
|[**apiSwadeshListsIdDelete**](#apiswadeshlistsiddelete) | **DELETE** /api/swadesh-lists/{id} | Логически удалить услугу|
|[**apiSwadeshListsIdLikePost**](#apiswadeshlistsidlikepost) | **POST** /api/swadesh-lists/{id}/like | Поставить/снять лайк|
|[**apiSwadeshListsIdPublishPut**](#apiswadeshlistsidpublishput) | **PUT** /api/swadesh-lists/{id}/publish | Опубликовать услугу|
|[**apiSwadeshListsPost**](#apiswadeshlistspost) | **POST** /api/swadesh-lists | Создать черновик языка|

# **apiSwadeshListsDraftGet**
> DsLanguageSerializer apiSwadeshListsDraftGet()

Возвращает черновик авторизованного пользователя (не более одного)

### Example

```typescript
import {
    LanguagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LanguagesApi(configuration);

const { status, data } = await apiInstance.apiSwadeshListsDraftGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**DsLanguageSerializer**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSwadeshListsFeedGet**
> DsFeedSerializer apiSwadeshListsFeedGet()

Возвращает первую опубликованную услугу или конкретную по id (в query). С ?next=true возвращает следующую.

### Example

```typescript
import {
    LanguagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LanguagesApi(configuration);

let id: number; //ID языка (optional) (default to undefined)
let next: boolean; //Если true — следующая за указанной (optional) (default to undefined)

const { status, data } = await apiInstance.apiSwadeshListsFeedGet(
    id,
    next
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID языка | (optional) defaults to undefined|
| **next** | [**boolean**] | Если true — следующая за указанной | (optional) defaults to undefined|


### Return type

**DsFeedSerializer**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSwadeshListsGet**
> Array<DsLanguageSerializer> apiSwadeshListsGet()

Возвращает список опубликованных языков с опциональным фильтром

### Example

```typescript
import {
    LanguagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LanguagesApi(configuration);

let mode: string; //Режим фильтра: year | decade | century (optional) (default to undefined)
let value: number; //Значение фильтра (год) (optional) (default to undefined)

const { status, data } = await apiInstance.apiSwadeshListsGet(
    mode,
    value
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **mode** | [**string**] | Режим фильтра: year | decade | century | (optional) defaults to undefined|
| **value** | [**number**] | Значение фильтра (год) | (optional) defaults to undefined|


### Return type

**Array<DsLanguageSerializer>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSwadeshListsIdDelete**
> DsSuccessResponse apiSwadeshListsIdDelete()

Меняет статус услуги на deleted через SQL UPDATE (soft delete)

### Example

```typescript
import {
    LanguagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LanguagesApi(configuration);

let id: number; //ID услуги (default to undefined)

const { status, data } = await apiInstance.apiSwadeshListsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID услуги | defaults to undefined|


### Return type

**DsSuccessResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSwadeshListsIdLikePost**
> DsLikeResponse apiSwadeshListsIdLikePost()

Поле like = 1 ставит лайк, like = 0 снимает

### Example

```typescript
import {
    LanguagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LanguagesApi(configuration);

let id: number; //ID услуги (default to undefined)

const { status, data } = await apiInstance.apiSwadeshListsIdLikePost(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID услуги | defaults to undefined|


### Return type

**DsLikeResponse**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**404** | Not Found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSwadeshListsIdPublishPut**
> DsLanguageSerializer apiSwadeshListsIdPublishPut()

Меняет статус черновика на published и заполняет поля

### Example

```typescript
import {
    LanguagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LanguagesApi(configuration);

let id: number; //ID услуги (default to undefined)

const { status, data } = await apiInstance.apiSwadeshListsIdPublishPut(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | ID услуги | defaults to undefined|


### Return type

**DsLanguageSerializer**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiSwadeshListsPost**
> DsLanguageSerializer apiSwadeshListsPost()

Создаёт новый черновик услуги с загрузкой изображения и видео

### Example

```typescript
import {
    LanguagesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LanguagesApi(configuration);

let title: string; //Название языка (default to undefined)
let image: File; //Изображение (optional) (default to undefined)
let video: File; //Видео (optional) (default to undefined)

const { status, data } = await apiInstance.apiSwadeshListsPost(
    title,
    image,
    video
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **title** | [**string**] | Название языка | defaults to undefined|
| **image** | [**File**] | Изображение | (optional) defaults to undefined|
| **video** | [**File**] | Видео | (optional) defaults to undefined|


### Return type

**DsLanguageSerializer**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |
|**401** | Unauthorized |  -  |
|**409** | Conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

