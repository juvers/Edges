import fetch from 'node-fetch';
import fs from 'fs';
require('dotenv').config();

const BASE_URL = 'https://api.github.com/';
const TOKEN = process.env.TOKEN;;

const generateClient = async (query, variables, endpoint = 'graphql', method = 'POST') => (
    await fetch(BASE_URL + endpoint, {
        method: method,
        mode: '*cors',
        cache: 'no-cache',
        credentials: 'include',
        body: JSON.stringify({ query, variables: variables }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`,
        },
    })
        .then(result => result.json()).then(value => {
            let schemaTypes = {};

            value.data.__schema.types.forEach(supertype => {
                if (supertype.schemaTypes) {
                    schemaTypes[supertype.name] =
                        supertype.schemaTypes.map(subtype => subtype.name);
                }
            });
            // N.B. Creating the possible types of the repository schema was part of my initial dev thought process
            // Output written file up the parent tree and outside of folder structure to prevent babel identifying changes and reloading

            //or Simply include an ignore configuration in .babelrc as ff:
            // "ignore": "\\.schemaTypes\\.json"
            fs.writeFile('./schemaTypes.json', JSON.stringify(schemaTypes), err => {
                if (err) {
                    console.error('Error writing schemaTypes.json', err);
                } else {
                    console.log('Fragment types successfully extracted!');
                }
            })
        }).catch(error => console.error(error)));
export default generateClient;