// Environment variables from the user environment.
const commonConfig = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,
    corsDomain: process.env.CORS_DOMAIN || '*',
    token: process.env.TOKEN
};

export default commonConfig;