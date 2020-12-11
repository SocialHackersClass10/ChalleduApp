
# ChalleduApp

This repository contains the Code of the ChalleduApp project, which is a result of collaboration between SHA-students of Class 10 & [Challedu.com](https://challedu.com).

## Quickstart

To launch the application you need to run both the backend and frontend applications:

- Running the backend

```bash
cd backend
npm start
```

You will see a message like `Server ready, listening on port 4321`. Your backend is ready!

- Running the frontend

```bash
cd frontend
npm start
```

## About the Server

The server is the back-end part of Challedu App.

The server's folder is **backend**, which resides under the main project folder. To successfully run the server during development phase, you need to execute following steps :
*   Open a terminal

*   Navigate to the main project folder ( it should be named **ChalleduApp** and contain 2 subfolders named **backend** and **frontend** and also this file, named **README.md** )

*   Ensure you are synchronized and have the latest merged changes by executing following commands :
```
        git checkout master
        git pull
```

*   Navigate to the backend folder and ensure you have all required dependencies installed ( all required application modules ) by executing following commands :
```
        cd backend
        npm i
```

*   The server requires the presence of the dotenv-file named **.env**. It should be present in this folder, but may be **hidden** under normal circumstances. Please verify its existence, and if missing, kindly replace it. The whole team has been provided with the latest contents of this file. More info on this file can be found in the paragraph: **About Server constants**

*   Once all dependency installations are complete and the dotenv file existence has been verified, you can run the server by following command :
```
    npm start
```

The server will log a greeting and either provide feedback in case of an error, or log **Server ready, listening on port XXXX** in case it was successfully initialized and is ready to serve.

You can now leave that console in the background for the duration of the tests. To stop the server, bring that console window to the foreground and press CTRL+C. This will terminate server execution.

## About Server constants  ( dotenv )

This file will contain any constants for the Back-end Server application
It is expected to reside inside the root folder of the back-end, for example:
```
./ChalleduApp/backend/
```

Connectivity with the database through the settings of this file have been verified by various users on both Linux and Windows operating systems.
If, for any reason there is a connectivity problem, the following online resource may proove helpful: [Node dotenv is not working](http://stackoverflow.com/questions/26973484/ddg#43973629)


The file contains following definitions:
*   SERVER_PORT=XXXXX
*   MONGODB_KEY=XXXXX
*   ACCESS_TOKEN_KEY=XXXXX
*   REFRESH_TOKEN_KEY=XXXXX


#### About constant SERVER_PORT:

This is the port our server will be listening to, when deployed. The final setting will be decided (most probably) by the client's admin team.

#### About constant MONGODB_KEY:

This defines the URL & the credentials & database name for the mongodb connection.
For the time being, it is pointing to a Private Cluster on Atlas.
It was suggested and decided to keep a common datastore for this step of the development cycle, so we could all have access to the same data.
The Team has been provided with a ".env" file, which contains all the necessary information to connect to said database.

#### About JWT KEYS constants

These keys are used to encrypt server-issued authorization tokens.

As their names imply, the ACCESS_TOKEN_KEY is used for issued access token encryptiion, valid for 24 hrs, and the REFRESH_TOKEN_KEY is used for encrypting issued refresh token, which are valid for 7 days.

It was decided to use 2 separate keys to enforce security and heighten cryptographic strength

The current values assigned to these keys are random 32 bytes obtained through following process:
```
    in the terminal type node and press enter

    on the new prompt type:
        require('crypto').randomBytes( XX ).toString('hex')
    ( where XX should be replaced by the desired length of the random key )
    and press enter

    copy the resulting text (without the quotes) and paste it into this file

    press CTRL+C to exit the node prompt ( possibly required twice )
```

Note that, with each new evocation of
```
    require('crypto').randomBytes( XX ).toString('hex')
```
the result is always a new random sequence of characters of XX length. It is deemed impossible to get the same result twice.
Values assigned to those keys, especially during the development phase, may be any sequence of any desired length.

However, for the deployment phase, the design team recommends the use of random sequences of at least 32 bytes.

The final key values of course, will be decided upon by the client's admin team, and will be disclosed only to their team members.

