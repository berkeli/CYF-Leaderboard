const config = {
    APIURL: process.env.NODE_ENV === 'production' ? 'https://cyf-leaderboard-api.herokuapp.com/' : 'http://localhost:4000/'
}

export default config;