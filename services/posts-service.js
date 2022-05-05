var fs = require("fs");
let rawdata = fs.readFileSync("mock_data.json");
let posts = JSON.parse(rawdata);

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

module.exports = postService;
