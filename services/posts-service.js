const fs = require("fs");
const axios = require("axios");
const rawdata = fs.readFileSync("mock_data.json");
const posts = JSON.parse(rawdata);
const redis = require("redis");
const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.log("Redis Error: " + err);
});

redisClient.on("connect", (err) => {
  console.log("Redis connection successfull");
});

redisClient.connect();

var postService = {};

//To get all the post
postService.getPosts = () => posts;

//To search by name and description
postService.searchPost = (q) => {
  if (q == undefined || q == "") {
    return posts;
  }

  var searchedPosts = [];
  posts.filter((item) => {
    if (q !== undefined && q != "") {
      if (q.indexOf('"') !== -1) {
        //exact match of the search string

        let regex = new RegExp(q.replace(/"/g, ""), "gi");

        //name field search
        let searchedName = item.name.match(regex);

        if (searchedName) {
          searchedPosts.push(item);
        }

        //descripition field search
        let searchedDescription = item.description.match(regex);
        if (searchedDescription) {
          searchedPosts.push(item);
        }
      } else {
        //name field search
        let searchedName = item.name.toLowerCase().match(q.toLowerCase());
        if (searchedName) {
          searchedPosts.push(item);
        }

        //descripition field search
        let searchedDescription = item.description
          .toLowerCase()
          .match(q.toLowerCase());
        if (searchedDescription) {
          searchedPosts.push(item);
        }
      }
    }
  });

  return searchedPosts;
};

postService.searchRedis = async (query) => {
  if (query !== undefined && query != "") {
    console.log("HTER");
    const searchUrl = `http://localhost:3000/api/posts/search?q=${query}`;
    const response = await redisClient.get(query);
    if (response) {
      return JSON.parse(response);
    } else {
      const { data } = await axios.get(searchUrl);
      redisClient.set(query, JSON.stringify(data));
      return data;
    }
  }
  return posts;
};

module.exports = postService;
