# Property Manager with MySQL

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  
## Description

This application was created and is used for backend development. This is a property manager created with the mysql2 node package. It's an application designed for users to view,update,and manage the properties through a database. It allows you to add,view, and delete properties within your database. You can also view cost management by location or state. It automatically calculates cost with a preestimated mortgage cost tax by state that has been integrated into the CLI prompts. Simply answer the prompts given and the calculations with be completed for you.. The application is used by the user through a series of prompts to be answered in the command line using nodes inquirer package. These answers directly effect the property manager database.

My main motivation for this application was to create an application to allow an individual to manage properties for multiple properties. You can view all costs including mortgage, rent, loan, ect of individual properties or all of them totally added up.
  
## Table of Contents

1. [Description](#description)  
2. [How to Install](#installation)  
3. [How to Use](#usage) 
4. [Demonstration](#demonstration)
5. [Licensing](#license)  
6. [Contact Me](#questions)

## Installation

Before using this generator I first had to make sure I had the necessary applications installed. The applications include [**VS-Code**](https://code.visualstudio.com/download), [**Gitbash**](https://gitforwindows.org/), as well as the latest version of [**node.js**](https://nodejs.org/en/download). Next I had to *Follow these steps:*

**1.** Within my project directory I am using the Node Package Manager. I installed this by typing `npm i` into the CLI.

**2.** In this project I am using nodes *inquirer* package, so I then installed *inquirer* by typing `npm install inquirer` into the CLI.

**3.** This application uses information for a database, So I used the *mysql2* package by installing the package by typing `npm install mysql2` into the cli.

**4.** Within this application a secure password was used to connect to the database within the code so I used the .env file to hide credentials. To install the proper usage of this package I typed `npm install dotenv` into the CLI

## Usage

For an propertymanager or myself to use this application you simply make sure you are in the root directory and type `node index.js` into the CLI. From here you are now in the employee manager, and you can add employees, roles, departments, remove them,view everything, and more. Here are a few screenshots determining the live usage:

**Main Interface**


![property](https://github.com/Goobergreve09/Property-Manager-with-MySQL/assets/143923830/350ff8ad-4b93-4215-ac1f-be6f36b82401)


**Viewing All Properties**


![all](https://github.com/Goobergreve09/Property-Manager-with-MySQL/assets/143923830/849d39df-00a2-44f8-9495-9b7b2870106e)

**Updating a Property**

![update](https://github.com/Goobergreve09/Property-Manager-with-MySQL/assets/143923830/ac4de22f-0ba3-4b58-ac8a-dddd7a56ced2)

**Viewing Property Cost Management**


![propertycostm](https://github.com/Goobergreve09/Property-Manager-with-MySQL/assets/143923830/db525adf-1972-4af1-adf9-4e47e5a69f9d)

## Demonstration
You can view a short video demonstration via youtube by clicking 'Demo Link' below:

[Demo Link](https://www.youtube.com/watch?v=w1I4rMTQqqA)

## Contributions

Special thanks for the knowledge and information to:

* [Node.js Documentation](https://nodejs.org/api/esm.html)

* [Mysql2 Package Documentation](https://www.npmjs.com/package/mysql2)

* [Async & Await MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

* [Switch() Method MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

* [mysql Documentation](https://dev.mysql.com/doc/)

* [MySQL CONCAT() W3Schools Documentation](https://www.w3schools.com/sql/func_mysql_concat.asp)

* [ReadME Generator](https://github.com/Goobergreve09/read-me-generator)


## License

The software license selected for this application *is as follows*:

**Massachusetts Institute of Technology License**

[MIT](https://opensource.org/licenses/MIT)



## Questions

If you have any additional questions you can contact me by using the following:

 Github Profile: [Goobergreve09](https://www.github.com/Goobergreve09)

 Email Address: gregory.greve@yahoo.com



