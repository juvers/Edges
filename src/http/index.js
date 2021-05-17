import fetch from 'node-fetch';
import { repo, commit } from '../graphql/task'
require('dotenv').config();


const BASE_URL = 'https://api.github.com/';
const TOKEN = process.env.TOKEN;
const httpClient = async (query, variables, endpoint = 'graphql', method = 'POST') => (
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
    }).then(res => res.text()).then(data => {
        // Remove return carriage and new line feed
        const content = data.replace(/\r?\n|\r/g, '');
        // Parse content to prevent unexpected behavior
        const parsed = JSON.parse(content);
        const create = (o) => {
            const base = o.data?.search;
            const main = base?.results;
            const final_object = {};

            // Retained defunct data should measures of central tendencies or variabilitites be needed
            // Defunct 'commit_count' :: Initially assumed as total count of all commits from all repos obtained by reducer

            // final_object['commit_count'] = main.reduce((acc, curr) => curr?.defaultBranchRef?.target?.history?.totalCount + acc, 0);

            // Defunct 'repo_count':: Initially obtained from returned data
            // final_object['repo_count'] = base?.repo_count;

            final_object['commit_count'] = commit
            final_object['repo_count'] = repo;
            const computed_results = [];

            // Compose results collection structure
            const collection = main.map(x => {
                const details_collected = {};
                details_collected['repository_name'] = x?.repository_name;
                details_collected['Star_count'] = x?.Star_count;
                const y = x?.commitComments?.authors;

                // Obtain inner nest by reducing to required quanta
                details_collected['authors'] = y.reduce((acc, curr) => {
                    const name_and_hash = {
                        Name: curr.commit?.authors?.nodes[0]?.name,
                        commit_hash: curr.commit?.commit_hash
                    };
                    acc.push(name_and_hash);
                    return acc;
                }, [])
                // Push name and hash obtained into index of collection
                computed_results.push(details_collected);
            });

            // Spread computed results into array collection and pass as results content
            final_object['results'] = [...computed_results];

            console.log(JSON.stringify(final_object, null, 4));
            console.log(process.env.TOKEN);
        }
        create(parsed);
    })
        .catch(error => console.error(error))
);

export default httpClient;

