# nodejs-secured-boilerplate
A general implementation of API and securing it's endpoints

# Reduce-Boilerplate-Code.
> Project: If you're planning to start a project from scratch in which you know you'll need to implement JWT+Role Based Auth therefore you may use this as a template 
in order to save time.

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Usage](#usage)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- Secure your api
- Just work on the logic part of your project 
- Don't worry about setting up JWT and Role Based Auth
- Just tell the route by passing role that you want to allow access and focus more on development!
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->


## Technologies Used
- JavaScript
- Node.js
- MYSQL
- Sequelize - ORM

Note: This will only work with the stack mentioned above



## Setup
- Just clone the repo 
- run ``` npm install ```
- Setup you database config in /config/config > add the database details
- define your endpoints accordingly
- set allowed roles in your routes
- run ``` npm run dev ``` or ```npm start``` in order to run the project


## Usage

For the ROLE_USER we have allowed the feed endpoint. The middleware will run to authenticate token and will extract claims from the token and then if the user has the role 'ROLE_USER' it will allow to access it  

```
Allowed for User with the ROLE_USER

// if the user has role "ROLE_USER" it will allow to access else no access!
router.get("/feed",
    [middlewares.tokenAuthentication,
    middlewares.roleAuthentication('ROLE_USER')],
    (req, res) => {
        res.json({
            auth: true,
            message: "allowed for user with role ROLE_USER",
            body: req.user
        });
    })


```

For the ROLE_ADMIN we have allowed the feed endpoint. The middleware will run to authenticate token and will extract claims from the token and then if the 
user has the role 'ROLE_ADMIN' it will allow to access it  


```
Allowed for User with the ROLE_ADMIN

// if the user has role "ROLE_ADMIN" it will allow to access else no access!
router.get("/manage", [middlewares.tokenAuthentication, middlewares.roleAuthentication('ROLE_ADMIN')],

    (req, res) => {
        res.json({
            auth: true,
            message: "Allowed for user with role ROLE_ADMIN",
            body: req.user
        })
    }); 
```
    
    



## Contact
Created with :heartpulse:	by [@anasbinsohail](https://www.instagram.com/anasbinsohail.dev) - feel free to contact me!

<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

