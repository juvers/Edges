### 


###### TASK
> Using the GitHub API, write a program that returns the authors and hashes of most recent N commits for
the top M repositories by star count in a language L.
---

###### Output: 
` {
"commit_count": 50,
"repo_count": 20,
"results": [{
    "repository_name": "..",
    "Star_count": 543,
    "authors": [{
        "Name": "...",
        "commit_hash": "..."
    }]
}]
} `

---

##### Assumptions:

##### Recommendations for further execution

##### Unit Test Cases

##### Instructions on how to run the program


### Fortune Back
#### Backend for React.js with Express Authentication and Authorization
--

### Description
#### Server side employed Node.js Express. Secured authentication with jsonwebtoken(JWT) was utilized. Sequelize for interacting with MySQL db.

###  Technology
- Express
- bcryptjs
- jsonwebtoken
- Sequelize
- MySQL

### Directory Structure
- config: configure MySQL db, Sequelize and Auth Key
- routes: post routes for signup and signin with public and protected routes
- middlewares: verifysignup.js to check duplicate username or email and authJwt.js to verify token and userrole in db
- controllers: controllers to handle signup and signin actions and also return public or protected resources
- models: useful for sequelize contracting
- server.js: to import all neccesary modules, initialize app and routes and listen for ocnnections

### Project 

###### Initial server setup
1. `mkdir <directory-name> && cd $_ && npm init`


2. Express as the http server and Babel (to enable ES6 and ES7 to keep some consistency in modularization of client and server)

3. `npm i -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/register`


4.  Notify Babel to transpile code into Javascript that the “current” Node.js version comprehends : `{
 "presets": [
   ["@babel/preset-env", {
     "targets": {
       "node": "current"
     }
   }]
 ]
}`

5. Replace the default “start” script. Since we’re coding with ES6/7, we need to use babel-node to run our code by lifting the server using nodemon and calling the app.js script with babel-node. `NODE_ENV=development nodemon src/app.js --exec babel-node`  

6.  Separate main bootstrapping file (containing all server config) from entry point(which imports server config file to run the app) file to facilitate ease of unit tests

7. Then we configure the cors middleware allowing all origins to query our API. This is for development purposes only, in production you MUST make sure that the allowed origins are trusted ones only.

8. Define utility methods such as endpoint to check if the API is up and running, and utility methods to change the app port and to start listening on the configured port.

9. GraphQL used to save expensive resource commutation which is great for mobile and upholds the principle of least privilege and also has a web interface to interact with our GraphQL API, it shows the schema, available queries/mutations and has autocomplete capabilities