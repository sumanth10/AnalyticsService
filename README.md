# Analytic service 

A service to get the analytics of a website

## Run it locally by following the set of commands

The service has two services , the backend node server which host the Rest APIs and a development webpack server which host the frontend angular app.

In order to run the service. Both the servers should be started. That has been taken care by a node module called concurrently which starts the server and client.

Before starting the servers  install the node modules by running

```js
npm install 
```
in both the server folder and the client folder.


To start the app run 

```js
npm run dev 
```

in the server's package.json


The client starts on 

```js

http://localhost:4200/
```
and all the calls are proxied to the backend server

The backend server runs on 

```js

http://localhost:4040/
```

The set of APIs have been defined in a folder  

```js
/pages/pages.route.js
```
and the APIs start with the pre-fix

```js
/api/pages

```
The pacakges and there uses in development

 - Joi : For validations of the environment variables and for API parameter validations
 - jsonwebtoken: For generation of web-tokens
 - express-validation: For the API parameter validations
 - http-status: For http status error logging and validations

Add the env required for the app to run in .env file








