# A Simple RESTful server using JWT in Express
This simple example uses 3 routes to demonstrate how JWT can be used to restrict access to only users who have authenticated themselves with the server.
Bookshelf is being used to connect to a users table in a mySQL database.

## Installation
First obviously...

```
npm install
```

...then locate `./config.js` and replace the values to match the details of your database as required. The example currently expects a table with the name of `users` with at least `username` and `password` columns.
Switching to different columns, table names, databases, ORMs or even just hard-coding user data as an example should all be easy edits if required.

## Routes

`GET: /`  
The root of the API should be accessible to everyone

`POST: /authenticate`  
Expects a username and password of an existing user account. Successful requests return a token

`GET: /test`  
Should only be accessible after authentication, providing the token the server supplied (for example, in the x-access-token header)

## Testing
I recommend [Postman](https://www.getpostman.com/) for testing RESTful APIs. This application makes it very simple to tailor your requests, see the responses you are receiving, and to copy any tokens you are handed to the "x-access-token" request header.
