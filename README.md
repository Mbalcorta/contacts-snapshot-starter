# Contacts Snapshot starter project

## Dev Setup

1. Create your database: `createdb contacts_development`
1. Load your database with the schema: `npm run load_schema`
1. Install your dependencies: `npm install`
1. Run the server: `nodemon`


    Authentication
- [x]  Create a signup page with a form (links to the login page)
- [x]  Create a login page with a form (links to the signup page)
  
  //first check that they have correct authorization 
  //then check that they are logged in
- [x]  Redirect users who are not logged in to the login page (Make sure not logged in users can't see any of the pages or data other than the login and signup pages)
- [x]  Create a user table in the database
- [x]  When a user signs up, a new user row is created in the user table
- [x]  When a user logs in, their username and password are validated in the user table. If the username/password combo doesn't exist or is invalid, the user receives an error.
- [x]  Passwords are encrypted with bcrypt
- [x]  express-session is used to store sessions on the server side. Notice the differences between  storing sessions on client  side(using cookie-session vs storing sessions on the server side(using express-session).
Authorization
- [x]  A user should have a role associated to it. The values are admin or regular.
- [x]  Only a user with an admin role should be able to create a new contact. If the logged in user is not an admin, going to the route /contacts/new should return a status code 403.
- [x]  Only a user with an admin role should be able to delete a contact. 
- [ ] If the logged in user is not an admin, going to the route /contacts/delete/:contactId should return a status code 403.
- [x] The delete links on the page should not be shown if the logged in user is not an admin.
