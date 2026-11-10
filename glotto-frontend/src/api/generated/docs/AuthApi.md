# AuthApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiAuthLoginPost**](#apiauthloginpost) | **POST** /api/auth/login | Вход в систему|
|[**apiAuthLogoutPost**](#apiauthlogoutpost) | **POST** /api/auth/logout | Выход (добавляет токен в blacklist)|
|[**apiAuthRegisterPost**](#apiauthregisterpost) | **POST** /api/auth/register | Регистрация пользователя|

# **apiAuthLoginPost**
> apiAuthLoginPost(body)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    DtoLoginRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let body: DtoLoginRequest; //Данные для входа

const { status, data } = await apiInstance.apiAuthLoginPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DtoLoginRequest**| Данные для входа | |


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAuthLogoutPost**
> DsSuccessResponse apiAuthLogoutPost()


### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

const { status, data } = await apiInstance.apiAuthLogoutPost();
```

### Parameters
This endpoint does not have any parameters.


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

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAuthRegisterPost**
> DsUserSerializer apiAuthRegisterPost(body)


### Example

```typescript
import {
    AuthApi,
    Configuration,
    DtoRegisterRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let body: DtoRegisterRequest; //Данные регистрации

const { status, data } = await apiInstance.apiAuthRegisterPost(
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DtoRegisterRequest**| Данные регистрации | |


### Return type

**DsUserSerializer**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |
|**409** | Conflict |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

