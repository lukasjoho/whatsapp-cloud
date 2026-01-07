## Base URL

| URL                        | Description |
| -------------------------- | ----------- |
| https://graph.facebook.com |             |

## APIs

| Method | Endpoint                                                                            |
| ------ | ----------------------------------------------------------------------------------- |
| DELETE | [/{Version}/{WABA-ID}/message_templates](#delete-version-waba-id-message-templates) |
| GET    | [/{Version}/{TEMPLATE_ID}](#get-version-template-id)                                |
| GET    | [/{Version}/{WABA-ID}/message_templates](#get-version-waba-id-message-templates)    |
| POST   | [/{Version}/{TEMPLATE_ID}](#post-version-template-id)                               |
| POST   | [/{Version}/{WABA-ID}/message_templates](#post-version-waba-id-message-templates)   |

<jumplink id="delete-version-waba-id-message-templates"></jumplink>

## DELETE /{Version}/{WABA-ID}/message_templates

Delete template by name

- Guide: [Message Templates](https://developers.facebook.com/docs/business-messaging/whatsapp/templates/overview)
- Guide: [How To Monitor Quality Signals](https://developers.facebook.com/docs/whatsapp/guides/how-to-monitor-quality-signals)
- Endpoint reference: [WhatsApp Business Account &gt; Message Templates](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/)

### Header Parameters

| Name          | Type   | Required | Description                                                                                                                                |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| User-Agent    | string |          | The user agent string identifying the client software making the request.                                                                  |
| Authorization | string | ✓        | Bearer token for API authentication. This should be a valid access token obtained through the appropriate OAuth flow or system user token. |

### Query Parameters

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| name   | string |          |             |
| hsm_id | string |          | Template ID |

### Responses

**200**

Example response / Example response

**Content Type**: `application/json`

**Schema**: object

| Property | Type    | Required | Description |
| -------- | ------- | -------- | ----------- |
| success  | boolean |          |             |

<jumplink id="get-version-template-id"></jumplink>

## GET /{Version}/{TEMPLATE_ID}

Get template by ID (default fields)

- Guide: [Message Templates](https://developers.facebook.com/docs/business-messaging/whatsapp/templates/overview)
- Guide: [How To Monitor Quality Signals](https://developers.facebook.com/docs/whatsapp/guides/how-to-monitor-quality-signals)
- Endpoint reference: [WhatsApp Message Template](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-hsm/)

### Responses

**200**

Example response

**Content Type**: `application/json`

**Schema**: object

| Property   | Type                                        | Required | Description |
| ---------- | ------------------------------------------- | -------- | ----------- |
| category   | string                                      |          |             |
| components | array of [Components](#object-components-3) |          |             |
| id         | string                                      |          |             |
| language   | string                                      |          |             |
| name       | string                                      |          |             |
| status     | string                                      |          |             |

<jumplink id="get-version-waba-id-message-templates"></jumplink>

## GET /{Version}/{WABA-ID}/message_templates

Get template by name (default fields)

- Guide: [Message Templates](https://developers.facebook.com/docs/business-messaging/whatsapp/templates/overview)
- Guide: [How To Monitor Quality Signals](https://developers.facebook.com/docs/whatsapp/guides/how-to-monitor-quality-signals)
- Endpoint reference: [WhatsApp Business Account &gt; Message Templates](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/)

### Header Parameters

| Name          | Type   | Required | Description                                                                                                                                |
| ------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| User-Agent    | string |          | The user agent string identifying the client software making the request.                                                                  |
| Authorization | string | ✓        | Bearer token for API authentication. This should be a valid access token obtained through the appropriate OAuth flow or system user token. |

### Query Parameters

| Name | Type   | Required | Description |
| ---- | ------ | -------- | ----------- |
| name | string |          |             |

### Responses

**200**

Example response / Example response

**Content Type**: `application/json`

**Schema**: object

| Property | Type                            | Required | Description |
| -------- | ------------------------------- | -------- | ----------- |
| data     | array of [Data](#object-data-4) |          |             |
| paging   | [Paging](#object-paging-6)      |          |             |

<jumplink id="post-version-template-id"></jumplink>

## POST /{Version}/{TEMPLATE_ID}

Edit template

- Guide: [Message Templates](https://developers.facebook.com/docs/business-messaging/whatsapp/templates/overview)
- Guide: [How To Monitor Quality Signals](https://developers.facebook.com/docs/whatsapp/guides/how-to-monitor-quality-signals)
- Endpoint reference: [WhatsApp Message Template](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-hsm/)

### Request Body (Optional)

**Content Type**: `application/json`

**Schema**: object

| Property   | Type                                        | Required | Description |
| ---------- | ------------------------------------------- | -------- | ----------- |
| category   | string                                      |          |             |
| components | array of [Components](#object-components-3) |          |             |
| language   | string                                      |          |             |
| name       | string                                      |          |             |

### Responses

**200**

Example response

**Content Type**: `application/json`

**Schema**: object

| Property | Type    | Required | Description |
| -------- | ------- | -------- | ----------- |
| success  | boolean |          |             |

<jumplink id="post-version-waba-id-message-templates"></jumplink>

## POST /{Version}/{WABA-ID}/message_templates

Create authentication template w/ OTP copy code button

- Guide: [Authentication Templates with OTP Buttons](https://developers.facebook.com/docs/business-messaging/whatsapp/templates/authentication-templates/authentication-templates)
- Guide: [Message Templates](https://developers.facebook.com/docs/business-messaging/whatsapp/templates/overview)
- Guide: [How To Monitor Quality Signals](https://developers.facebook.com/docs/whatsapp/guides/how-to-monitor-quality-signals)
- Endpoint reference: [WhatsApp Business Account &gt; Message Templates](https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/)

### Request Body (Optional)

**Content Type**: `application/json`

**Schema**: object

| Property   | Type                                        | Required | Description |
| ---------- | ------------------------------------------- | -------- | ----------- |
| category   | string                                      |          |             |
| components | array of [Components](#object-components-8) |          |             |
| language   | string                                      |          |             |
| name       | string                                      |          |             |

### Responses

**200**

Example response / Example response / Example response / Example response / Example response / Example response / Example response / Example response / Create Flow Template Message by Name / Create Flow Template Message by Flow JSON / Create Flow Template Message by ID

**Content Type**: `application/json`

**Schema**: object

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| category | string |          |             |
| id       | string |          |             |
| status   | string |          |             |

# Components

## Inline Object Definitions

<jumplink id="object-buttons-1"></jumplink>

### Buttons

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| text     | string |          |             |
| type     | string |          |             |

<jumplink id="object-example-2"></jumplink>

### Example

| Property  | Type                     | Required | Description |
| --------- | ------------------------ | -------- | ----------- |
| body_text | array of array of string |          |             |

<jumplink id="object-components-3"></jumplink>

### Components

| Property | Type                                  | Required | Description |
| -------- | ------------------------------------- | -------- | ----------- |
| buttons  | array of [Buttons](#object-buttons-1) |          |             |
| example  | [Example](#object-example-2)          |          |             |
| format   | string                                |          |             |
| text     | string                                |          |             |
| type     | string                                |          |             |

<jumplink id="object-data-4"></jumplink>

### Data

| Property   | Type                                        | Required | Description |
| ---------- | ------------------------------------------- | -------- | ----------- |
| category   | string                                      |          |             |
| components | array of [Components](#object-components-3) |          |             |
| id         | string                                      |          |             |
| language   | string                                      |          |             |
| name       | string                                      |          |             |
| status     | string                                      |          |             |

<jumplink id="object-cursors-5"></jumplink>

### Cursors

| Property | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| after    | string |          |             |
| before   | string |          |             |

<jumplink id="object-paging-6"></jumplink>

### Paging

| Property | Type                         | Required | Description |
| -------- | ---------------------------- | -------- | ----------- |
| cursors  | [Cursors](#object-cursors-5) |          |             |

<jumplink id="object-buttons-7"></jumplink>

### Buttons

| Property        | Type   | Required | Description |
| --------------- | ------ | -------- | ----------- |
| flow_action     | string |          |             |
| flow_id         | string |          |             |
| navigate_screen | string |          |             |
| text            | string |          |             |
| type            | string |          |             |

<jumplink id="object-components-8"></jumplink>

### Components

| Property | Type                                  | Required | Description |
| -------- | ------------------------------------- | -------- | ----------- |
| buttons  | array of [Buttons](#object-buttons-7) |          |             |
| text     | string                                |          |             |
| type     | string                                |          |             |

## Authentication

| Scheme     | Type        | Location                |
| ---------- | ----------- | ----------------------- |
| bearerAuth | HTTP Bearer | Header: `Authorization` |

### Usage Examples

- **bearerAuth**: Include `Authorization: Bearer your-token-here` in request headers

### Global Authentication Requirements

All endpoints require: bearerAuth
