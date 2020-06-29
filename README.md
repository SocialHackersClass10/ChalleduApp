# ChalleduApp
This repository contains the Code of the project, ChalleduApp, as a result of the collaboration between SHA-students of Class 10 &amp; Challedu.com.

## About Server constants  ( dotenv )
This file will contain any constants for our Back-end Server application
It is expected to reside inside the root folder of the back-end, for example:
```
./ChalleduApp/backend/
```

The connectivity with the database through the settings of this file have been verified by various users on both Linux and Windows operating systems.
If, for any reason there is a connectivity problem, the following online resource may proove helpful: [Node dotenv is not working](http://stackoverflow.com/questions/26973484/ddg#43973629)


The file contains following definitions:
*   SERVER_PORT=XXXXX
*   MONGODB_KEY=XXXXX
*   ACCESS_TOKEN_KEY=XXXXX
*   REFRESH_TOKEN_KEY=XXXXX


#### About constant SERVER_PORT:
This is the port our server will be listening to, when deployed. The final setting will be decided (most probably) by the client.

#### About constant MONGODB_KEY:
This defines the URL & the credentials & datanase name for the mongodb connection.
For the time being, we have it pointing to a Private Cluster on Atlas.
It was suggested and decided to keep a common datastore for this step of the development cycle, so we could all have access to the same data.
The Team has been provided with a ".env" file, which contains all the necessary information to connect to that database.

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

