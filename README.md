# CYF-Leaderboard
Website to keep track of your progress on CodeWars and Authored Collections from CodeWars

# Technologies used:
##  Backend
API is built using the following technologies: TypeScript, Node.js, Express, MongoDB with Mongoose driver. Redis cache is also implemented for blazing fast response times
The backend has a daily cron job to scan the followers of 'CodeYourFuture' clan and their completed katas. It also scans authored collection of the clan and adds statistics to each clan memmer. 

##  Frontend
Frontend is built using Next.js, TypeScript. Used axios to fetch data from the api and Chackra UI for the styling. 

# In Roadmap: 

- Authored collections page, show list of all collections for the clan with katas list.
- User profile page, more in depth view of users completed katas and authored collections progress (which katas complete & etc)
- Search by name
- General refactoring of code

# How to run locally: 
## Backend: 
### Pre-Requisities: MongoDB & Redis running locally or remotely, configure .env file with the following variables: 
DBURL = 'mongodb://localhost:27017/'
REDIS_URL = 'redis://:password@127.0.0.1:6379/5'
1. Run `yarn` 
2. Run `yarn watch`
3. Run `yarn dev`

## Frontend: 
### Pre-Requisities: API running locally
1. Run `yarn`
2. Run `yarn dev`
