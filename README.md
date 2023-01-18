# NoSQL Challenge: Social Network API Challenge-18

## Description

Your challenge is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. You’ll use Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Screenshots](#screenshots)
4. [Credits](#credits)
5. [Tests](#tests)
6. [License](#license)
7. [Questions](#questions)

## Installation

npm i express "^4.17.1"  
 npm i mongoose "^6.0.13"  
 npm i mongodb "^4.5.0"  
 npm i "nodemon": "^2.0.9"

## Usage

scripts:
"start": "node index",<br>
"dev": "nodemon index",<br>
"seed": "node utils/seed"<br>

Make sure to have insomnia or something similar installed:

THOUGHTS:

localhost:5001/api/thoughts - shows all thoughts made by users (get)<br>
localhost:5001/api/thoughts/63c4a3a50cb775b7b4f10a18 - shows thought made by user (get)<br>
localhost:5001/api/thoughts - create a thought (post)<br>
localhost:5001/api/thoughts/63c4a3a50cb775b7b4f10a18 - deletes a thought (delete)<br>
localhost:5001/api/thoughts/63c5e89e183665bee8353e10 - updates a thought (put)<br>

USERS:

localhost:5001/api/users - Shows all users (get)<br>
localhost:5001/api/users/63c4a32d0cb775b7b4f10a10 - shows user by id (get)<br>
localhost:5001/api/users - create a user (post)<br>
localhost:5001/api/users/63c4a32d0cb775b7b4f10a10 - Deletes a user (delete)<br>
localhost:5001/api/users/63c49c60f8489141a41d2097 - updates a user (put)<br>

#Link to Demo
https://drive.google.com/file/d/1KEW4C0FL4nZBLykrCV9waQ3B86-VYmyP/view

## Screenshots

All Thoughts:
![Alt text](assets/allThoughts.jpeg)

Single Thought:
![Alt text](assets/singleThought.jpeg)

Create a thought:
![Alt text](assets/createThought.jpeg)

Delete a thought:
![Alt text](assets/deleteThought.jpeg)

Update a thought:
![Alt text](assets/updateThought.jpeg)

All Users:
![Alt text](assets/findAll.jpeg)

Single User:
![Alt text](assets/single_User.jpeg)

Create a user:
![Alt text](assets/createUser.jpeg)

Delete a user:
![Alt text](assets/deleteUser.jpeg)

Updates a User:
![Alt text](assets/update_User.jpeg)

## Tests

N/A

## License

Licensed under the [MIT license](https://choosealicense.com/licenses/mit/)

## Questions

- GitHub: https://github.com/mrartrager/NoSQL-Challenge-Social-Network-API
- Email: matthew.d.waldron@gmail.com
