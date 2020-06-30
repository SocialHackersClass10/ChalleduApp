# ChalleduApp
This repository contains the Code of the project, ChalleduApp, as a result of the collaboration between SHA-students of Class 10 &amp; Challedu.com.

## About Server constants  ( dotenv )
This file will contain any constants for our Back-end Server application
It is expected to reside inside the root folder of the back-end, for example:
```
./ChalleduApp/backend/
```

Up to now we have following 2 definitions:
*   SERVER_PORT=XXXXX
*   MONGODB_KEY=XXXXX

#### About constant SERVER_PORT:
This is the port our server will be listening to, when deployed. The final setting will be decided (most probably) by the client.

#### About constant MONGODB_KEY:
This defines the URL & the credentials & datanase name for the mongodb connection.
For the time being, we have that URL pointing to a Private Cluster on Atlas.
It was suggested and decided to keep a common datastore for this step of the development cycle, so we could all have access to the same data.
The Team has been provided with a ".env" file, which contains all the necessary information to connect to that database.

Positive connection feedback has been reported for both Linux and Windows O.S.

If, for any reason there is a connectivity problem, I have found the following online resource to be very helpful:
[Node dotenv is not working](http://stackoverflow.com/questions/26973484/ddg#43973629)

#### About JWT KEYS
The access and refresh token keys are in .env file..