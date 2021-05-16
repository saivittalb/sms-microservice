# SMS Microservice
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PR's Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](http://makeapullrequest.com) 
[![GitHub followers](https://img.shields.io/github/followers/saivittalb.svg?style=social&label=Follow)](https://github.com/saivittalb?tab=followers) 
[![Twitter Follow](https://img.shields.io/twitter/follow/saivittalb.svg?style=social)](https://twitter.com/saivittalb)

An SMS microservice designed to facilitate functionality for basic SMS service. Designs are based on a fictional scenario. 

The microservice is deployed on Heroku. The URL is listed in this repo's description. Since Heroku makes an app go to sleep after being idle for a long time, wait for 10 seconds to get a response for the first request.

Tech stack used – MongoDB, Express, and Node.js.

More info regarding the assignment can be found in ```Design Specifications.pdf``` file and a brief report can be found in ```ESA Assignment-4.docx```.

Developed as a part of an assignment for the course CS 474 – Enterprise Software Architecture.

###### Note 
Following versions were used in the development of this demo:
- Node.js 14.16.1.
- Node Package Manager (npm) 7.12.1.
- Editor used was Visual Studio Code 1.56.1.

## Table of contents
* [License](#license)
* [Instructions to setup locally](#instructions-to-setup-locally)
    * [Installing modules](#installing-modules)
    * [Running the servers](#running-the-servers)
    * [Testing the APIs](#testing-the-apis)
* [APIs and their behavior](#apis-and-their-behavior)
    * [SMS Microservice](#sms-microservice)
        * [Post an inbound SMS](#post-an-inbound-sms)
        * [Post an outbound SMS](#post-an-outbound-sms)
        * [Default response](#default-response)
* [Validations](#validations)
* [Contributing](#contributing)

## License
This project is licensed under the MIT License, a short and simple permissive license with conditions only requiring preservation of copyright and license notices. Licensed works, modifications, and larger works may be distributed under different terms and without source code.

<p align="center"> Copyright (c) 2021 Sai Vittal B. All rights reserved.</p>

## Instructions to setup locally
### Installing modules
- Run the following commands in the terminal/console window in the project directory:
```bash
$ cd sms-microservice

$ npm install
```

### Running the servers
- Setup a MongoDB Atlas cluster under free tier plan and create a ```.env``` file in ```sms-microservice``` folders under the following schema:
```
MONGODB_URI="<YOUR-CONNECTION-STRING-HERE>"
```
- Add the variable ```TOKEN_SECRET="1234567890"``` in your ```.env``` file.
- You can also use my credentials for ```.env``` file which is provided in the ```ESA Assignment-4.docx``` file. Use responsibly and don't spam my database.
- Run the following commands in the terminal/console window to run SMS Microservice:
```bash
$ cd sms-microservice

$ node server.js
```
- In case if you want to run the application dynamically whenever file changes in the directory are detected, replace ```node``` with ```nodemon```. For example,
```bash
$ nodemon server.js
```

### Testing the APIs
- You can run the basic unit tests written for all the controller functions by entering the following command:
```bash
$ npm run test
```
- You can test the microservice with Postman (both using Heroku URL or locally) by importing the provided collection into your Postman client. They were exported via Postman Collection v2.1 in JSON format. There are separate folders named ```Local``` and ```Heroku``` giving you the freedom to test on both platforms.


###### Note
A key named ```app-secret``` must be passed with the value ```Bearer 1234567890``` in the headers for each request for successful authorization.

## APIs and their behavior
### SMS Microservice
#### Post an inbound SMS
This API will be exposed to the client.

- Method – POST
- Route – ```http://localhost:3000/inbound/sms```

This will create an inbound SMS.

- Example request body:
```bash
{
    "from": "1234567890",
    "to": "123456",
    "text": "hello, STOP\n"
}
```

- Example successful response:
```bash
{
    "message": "inbound sms is ok",
    "error": ""
}
```

- For unsuccessful responses, refer to ```Design Specifications.pdf``` document. The responses this app gives exactly syncs with those.

#### Post an outbound SMS
This API will be exposed to the client.

- Method – POST
- Route – ```http://localhost:3000/outbound/sms```

This will create an inbound SMS.

- Example request body:
```bash
{
    "from": "1234567890",
    "to": "123456",
    "text": "test"
}
```

- Example successful response when the user is blocked (comparisions done with cache):
```bash
{
    "message": "",
    "error": "sms from 1234567890 to 123456 is blocked by STOP request"
}
```

- Example successful response when the user is not blocked:
```bash
{
    "message": "outbound sms is ok",
    "error": ""
}
```

- For unsuccessful responses, refer to ```Design Specifications.pdf``` document. The responses this app gives exactly syncs with those.

#### Default response
This will be the default response for all other methods and configurations

Status Code - 405 
```bash
{
    "message": "Method Not Allowed"
}
```

## Validations
Basic unit tests are written for all the existing functions using Mocha and Chai which can be viewed in the ```/test/sms.js``` file.

All the APIs perform necessary validations as per the provided design specifications. Along with this, other extra validations are performed in some APIs. These validations are self-explainable and can be seen in the codebase with comments wherever required.

All the corner cases are addressed appropriately. If you discover any failing test cases, you are encouraged to open an issue or a PR regarding it.

## Contributing
- Fork this project by clicking the ```Fork``` button on the top right corner of this page.
- Open terminal/console window. 
- Clone the repository by running the following command in git:
 ```bash
$ git clone https://github.com/[YOUR-USERNAME]/sms-microservice.git
```
- Add all changes by running this command.
```bash
$ git add .
```
- Or to add specific files only, run this command.
```bash
$ git add path/to/your/file
```
- Commit changes by running these commands.
```bash
$ git commit -m "DESCRIBE YOUR CHANGES HERE"

$ git push origin
```
- Create a Pull Request by clicking the ```New pull request``` button on your repository page.

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/saivittalb/) 
[![ForTheBadge powered-by-electricity](http://ForTheBadge.com/images/badges/powered-by-electricity.svg)](http://ForTheBadge.com)

<p align="center"> Copyright (c) 2021 Sai Vittal B. All rights reserved.</p>
<p align="center"> Made with ❤ by <a href="https://github.com/saivittalb">Sai Vittal B</a></p>
