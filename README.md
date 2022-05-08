# Kodo Node.js Assignment

### Prerequisites
* Download [Node.js v14.17.3](https://nodejs.org/download/release/v14.17.3/)
* Download [Redis](https://redis.io/download/) in-memory data store for caching search results
* Download the zip file or clone the repository

### Description
Used Redis as in memory data store for caching search results. When a user search for any keyword, it will first search in Redis cache, if not found then create a new "key" and store the data in Redis cache. If same keyword is requested back it will send the result from Redis cache.

### Install the dependent modules
npm install

### Start the application
npm start

### Open browser and navigate to below link
http://localhost:3000/


### Restful APIs

* To get all the post - 
    http://localhost:3000/api/posts

* To search the post by name and description field - 
    http://localhost:3000/api/posts/search?q=dilshad

* To store the search result in Redis cache - 
    http://localhost:3000/api/posts/searchredis?q=customer


### To run the test cases
npm test
