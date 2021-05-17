// HTTP SERVER
import express from 'express';
import cors from 'cors';
import httpClient from './http';
import generateClient from './http/generate';
import { TaskQuery, TaskVariables, TaskSchema } from './graphql/task';
// import { graphqlHTTP } from 'express-graphql';
// import schema from './graphql/schema';

// Config
import config from './config';
const app = express();

function setPort(port = 5501) {
    app.set('port', parseInt(port, 10));
}

function listen() {
    const port = app.get('port') || 5501;
    app.listen(port, () => {
        console.log(`The server is running and listening at http://localhost:${port}`);
        // Log task after app has begun listening
        httpClient(TaskQuery, TaskVariables);
        // generateClient(TaskSchema);

    })
}

app.use(cors({
    origin: config.corsDomain, // In Production, production domain is advised
    optionsSuccessStatus: 200
}));


// Endpoint to check if the API is running
app.get('/api/status', (req, res) => {
    res.send({ status: 'ok' });
});

// Graphiql interface setup
// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: global,
//     graphiql: true,
// }));

export default {
    getApp: () => app,
    setPort,
    listen
};