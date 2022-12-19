# EXPRESS

### Setup

1. Use and setup the project with `yarn`.
2. Convert the project to Typescript.
3. Initialize tsconfig.
4. Create .gitignore file to ignore the node_modules
## Problem Description:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) using SQLite database, document and publish your endpoints using postman.
In this project, you’ll build a basic CRUD (Create, Read, Update, Delete) for an Hotel Listing Application. 

## Requirements:

IMPLEMENT AUTHORIZATION AND AUTHENTICATION: PROTECT ALL ROUTES. ONLY THE LOGGED-IN USERS CAN PERFORM THE FOLLOWING OPERATIONS

- You can browse through listings.
- You can create hotel listings
- You can edit a hotel listing.
- You can delete a hotel listing.

## How will I complete this project?

- Your aplication should be able to perform.
  - `GET` Request which returns all the data in your database
  - `POST` Request which adds data to your database file 
  - `PUT` Request which updates fields of a particular data using the id in database
  - `DELETE` Request which removes a particular data from your database using the id
## Also
  - Host your application on Heroku.
  - Data format example:This show the model for users and the listing created by the user

```
  {
    fullName: "Bond Michael",
    email: "bond@gmail.com",
    phoneNumber: "12345",
    password: "12333444",
      Listings:[

      {
        description:'Clean and fully furnished apartment',
        image:'https://meany.com',
        address:"Edo tech park",
        price:10000,
        numOfBeds:1,
        numOfBaths:3,
        rating:5
        id:"1"
   },
   ....
 ]
}

```

## FRONTEND

- Page to display all listings
- Implement an admin/dashboard area to add, edit and delete ( User can only edit and delete listings created by the user)
- Create a Login Page and Sign Up Page

## Test coverage

- Make sure you write test to cover your application using Jest/supertest

### Test

- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes
