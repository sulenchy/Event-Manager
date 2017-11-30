# Event Manager
[![Build Status](https://travis-ci.org/sulenchy/Event-Manager.svg?branch=develop)](https://travis-ci.org/sulenchy/Event-Manager) [![Coverage Status](https://coveralls.io/repos/github/sulenchy/Event-Manager/badge.svg?branch=develop)](https://coveralls.io/github/sulenchy/Event-Manager?branch=develop) [![Test Coverage](https://api.codeclimate.com/v1/badges/abe3a40a6fe630f7f4c7/test_coverage)](https://codeclimate.com/github/sulenchy/Event-Manager/test_coverage) 

# Intorduction
This is a project divided into three parts:

1.  The Templates:

    * This part holds the UI or template for the whole project.
2.  The Server:

    * This part holds the basic functionalities that will make the UI interactive for users
3.  The Client:

    * This part hold the front-end functionalities that enables users have seamless experience using the web application

# Getting Started
This is a project in three parts, and the first part is to design a UI Template to be hosted using Github Pages. To view the UI template for the Event-Manager web application on Github Pages, you should click on this link https://sulenchy.github.io/Event-Manager/template/index.html.

The second part of this project is the Sever-side. The server-side is where the functionality for the API is stored and to be used to power the Template UI previously designed. This is the part where the logic on how Users are created, User Authentication is handled, API versioning is used, JSONWEBTOKEN is used to protect different endpoints etc.

# Prerequisites
The things needed before one can run this app are:
* A broswer of your choice but preferably Google Chrome.
* Internet

# Documentation
*   To signup using POSTMAN

1.  Goto the address(localhost:8000/api/v1/users/signin)
2.  choose POST request and select x-www-form-urlencoded
3.  enter in the body of the request  email: your-chosen-email password: our-chosen-password
4.  send the request and you should get a success response if your request was successful else an error will be return

*   To POST a User using POSTMAN

1.  Goto to the POST User endpoint(localhost:8000/api/v1/users/signup)

2.  supply in the body of your request the following:
    *   username: name-of-the-client
    *   email: email-of-the-client
    *   password: password-of-the-client
    *   retypePassword: password-of-the-client
    *   userType: admin-or-client
3.  Send the POST request, if your request was successful you'll get a response showing the recipe you just added if the request was unsuccessful, it will return the error.


*   To POST a Center using POSTMAN

1.  Goto to the POST Center endpoint(localhost:8000/api/v1/centers)

2.  supply in the body of your request the following:
    *   name: name-of-the-center
    *   address: address-of-the-center
    *   capacity: capacity-of-the-capacity
    *   facilities: facilities-of-the-facilities
    *   image: image-of-the-center
    *   cost: cost-of-the-center
3.  Send the POST request, if your request was successful you'll get a response showing the recipe you just added if the request was unsuccessful, it will return the error.


*   To GET all Centers using POSTMAN

1.  Goto to the GET Center endpoint(localhost:8000/api/v1/centers)

2.  send the GET request, if your request was successful you'll get a 200 status response showing the list of Centers you requested for and if the request was unsuccessful, it will return a 403 error and the resource will be unavailable to you.


*   To GET a Center using POSTMAN

1.  Goto to the GET Center endpoint(localhost:8000/api/v1/centers/1)

2.  send the GET request, if your request was successful you'll get a 200 status response showing the Center you requested for with slated events and if the request was unsuccessful, it will return a 403 error and the resource will be unavailable to you.

*   To POST a Event using POSTMAN

1.  Goto to the POST Event endpoint(localhost:8000/api/v1/events)

2.  supply in the body of your request the following:
    *   title: name-of-the-center
    *   description: address-of-the-center
    *   event-type: capacity-of-the-capacity
    *   estimated_attendees: facilities-of-the-facilities
    *   event_date: image-of-the-center
    *   lga: cost-of-the-center
    *   centerId: cost-of-the-center
3.  Send the POST request, if your request was successful you'll get a response showing the recipe you just added if the request was unsuccessful, it will return the error.

# Running Test
To run the template of the app, you only need the URL below: 
https://sulenchy.github.io/Event-Manager/template/index.html

To run the api endpoint on Heroku:

# Built With
    HTML/CSS
    * Javascript
    * Twitter Bootstrap / Font Awesome
    * Node.js
    * Express.js
    * Postgresql

# Authors
Abudu Abiodun Sulaiman (Sulenchy)

# Acknowledgments
N/A

# License
This project is licensed under the MIT License - see the LICENSE.md file included for details.