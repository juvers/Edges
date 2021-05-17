### EDGES


###### TASK
> ######  Using the GitHub API, write a program that returns the authors and hashes of most recent N commits for the top M repositories by star count in a language L.
---

###### OUTPUT: 

<pre>
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
</pre>

---

###### I. Assumptions
1. Integrity of data from endpoint is guaranteed
2. Resolving the data shape is paramount such that methods and stack are secondary.
3. Github PAT other than that used by the developer will be made available by reviewer to explore project.
   
###### II. Unit Test Cases
N/A

######  III. Technology
- express
- graphql
- express-graphql
- fetch-node
- babel

###### IV. Directory Structure
- Parent Directory
<pre>
.
├── .babelrc
├── .env
├── .git
├── .gitignore
├── README.md
├── node_modules
├── package.json
├── src
└── yarn.lock 
</pre>

- App Directory
<pre>
.
├── app.js
├── config
│   └── index.js
├── graphql
│   ├── schema.js
│   └── task.js
├── http
│   ├── generate.js
│   └── index.js
└── server.js
</pre>

###### V. Design Assets
1. Javascript was opted for as the language of design because it offers the great advantage of writing in single langauge on both client and server.
2. Babel transpiler was used to enable writing in ES6 and ES7 to keep some consistency in modularization of client and server syntax
3. Separation of concerns by severing main bootstrapping file (containing all server config) from entry point(which imports server config file to run the app) file to facilitate ease of unit tests
4. Cors middleware was used to give server control over which domain(authority), scheme or port can access resources generated. Whilst for development purposes only * was used, in production only trusted origins are recommended. 
5. Utility methods were defined such as endpoint to check if the API is up and running, and utility methods to change the app port and to start listening on the configured port.
6. GraphQL used to save expensive resource commutation which is great for mobile and upholds the principle of least privilege and also has a web interface to interact with our GraphQL API, which shows the schema, available queries/mutations and has autocomplete capabilities.
7. Node-fetch was used as it is by far the smallest sized request client zipped less than 300 bytes.

###### VI. Instructions on how to run the program
1. Clone app or download zipped folder (and unzip).
2. Ensure node is already installed. You can visit `https://nodejs.org/en/download/` 
3. Install yarn through the npm package manager that accompanies node `npm install --global yarn`
4. Once inside folder run `yarn install`
5. Since the endpoint for this project is `https://api.github.com/graphql` authentication is required to communicate with the GraphQL server. Therefore create PAT(personal access token) as follows: 
   1. Settings > Developer Settings > 
   2. Match the follow scopes behavior when creating PAT 
   <pre>
    ` user 
      public_repo
      repo
      repo_deployment
      repo:status
      read:repo_hook
      read:org
      read:public_key
      read:gpg_key
   `
   </pre>
  1. Create a .env file as shown in the parent directory structure above and paste the token in the .env file as follows: `TOKEN='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'`
  Remeber to replace the token with your own token as this is a sample.

  4. Run `yarn start`


###### VI. Recommendations for Project Completeness
1. Use Type System and
2. Utilize schema builder to offer advanced information of shape.
3. Use a Graph Leveler to minimize overhead and clean up edges and nodes with other expansive nesting.
4. To allow for better analytics population information should be gathered to use measures of central tendency and variability(dispersion) which empowers probability distribution. 
5. Plug in the user interface with graphical.
6. Build a client side to allow friendly interaction with app
7. Run unit tests 