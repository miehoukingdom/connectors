# OAuth standard connector

The official Logto connector for OAuth 2.0 protocol.

## Get started

The OAuth connector enables Logto's connection to an arbitrary social identity provider that supports OAuth 2.0 protocol.

In the following guide, let's take Google as an example to show how to set up a OAuth connector.

> ℹ️ **Note**
> 
> OAuth connector is a special kind of connector in Logto, you can add a few OAuth-based connectors.

## Register a Google App

For detailed steps on registering a Google App for Logto's social sign-in use, please refer to [Logto Google Connector configuration guide](https://github.com/logto-io/connectors/tree/master/packages/connector-google#set-up-a-project-in-the-google-api-console).

## Compose the connector JSON

We ONLY support "Authorization Code" grant type for security consideration and it can perfectly fit Logto's scenario.

`scope` determines the resource you can access to after a successful authorization.

`clientId` and `clientSecret` can be found at your Google app details page.

You are expected to find `authorizationEndpoint`, `tokenEndpoint` and `userInfoEndpoint` in social vendor's documentation.

Logto also provide a `profileMap` field that users can customize the mapping from the social vendors' profiles which are usually not standard. The key is Logto's standard user profile field name and corresponding value should be social profiles field name. In current stage, Logto only concern 'id', 'name', 'avatar', 'email' and 'phone' from social profile, only 'id' is required and others are optional fields.

You can find [Google user profile response](https://developers.google.com/identity/openid-connect/openid-connect#an-id-tokens-payload) and hence its `profileMap` should be like:

```json
{
  "id": "sub",
  "avatar": "picture"
}
```

Here is an example of OAuth connector config JSON connected to Google server. Other vendor's config could vary.

> ℹ️ **Note**
> 
> `responseType` and `grantType` can ONLY be FIXED values with authorization code grant type, so we make them optional and default values will be automatically filled.

### Authorization Code grant type

`tokenEndpoint` is required since a token request is obligatory.

`tokenEndpointResponseType` is an optional field, and should be either 'query-string' or 'json' if provided. The default value is 'query-string'. It will determine how OAuth connector parse the token response and an error could break the social sign-in flow if wrong value is set.

```json
{
  "clientId": "<your-client-id>",
  "clientSecret": "<your-client-secret>",
  "scope": "<OPTIONAL-'profile email'>",
  "authorizationEndpoint": "<vendor-authorization-endpoint>",
  "tokenEndpoint": "<vendor-token-endpoint>",
  "tokenEndpointResponseType": "<OPTIONAL-'json'-or-'query-string'>",
  "userInfoEndpoint": "<vendor-user-info-endpoint>",
  "profileMap": {
    "id": "<OPTIONAL-'id'>",
    "name": "<OPTIONAL-'name'>",
    "avatar": "<OPTIONAL-'avatar'>",
    "email": "<OPTIONAL-'email'>",
    "phone": "<OPTIONAL-'phone'>"
  },
  "customConfig": {
    "customParameter1": "<OPTIONAL-custom-parameter-1>",
    "customParameter2": "<OPTIONAL-custom-parameter-2>"
  }
}
```

> ℹ️ **Note**
> 
> We provided an OPTIONAL `customConfig` key to put your customize parameters.
> Each social identity provider could have their own variant on OAuth standard protocol. If your desired social identity provider strictly stick to OAuth standard protocol, the you do not need to care about `customConfig`.


## Config types

| Name                      | Type                   | Required |
|---------------------------|------------------------|----------|
| authorizationEndpoint     | string                 | true     |
| userInfoEndpoint          | string                 | true     |
| clientId                  | string                 | true     |
| clientSecret              | string                 | true     |
| tokenEndpointResponseType | enum                   | false    |
| responseType              | string                 | false    |
| grantType                 | string                 | false    |
| tokenEndpoint             | string                 | false    |
| scope                     | string                 | false    |
| customConfig              | Record<string, string> | false    |
| profileMap                | ProfileMap             | false    |

| ProfileMap fields | Type   | Required | Default value |
|-------------------|--------|----------|---------------|
| id                | string | false    | id            |
| name              | string | false    | name          |
| avatar            | string | false    | avatar        |
| email             | string | false    | email         |
| phone             | string | false    | phone         |

## Reference

* [The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749)
* [Google Identity: Setting up OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/openid-connect#appsetup)
