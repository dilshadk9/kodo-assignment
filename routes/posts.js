var express = require("express");
var router = express.Router();
var postService = require("../services/posts-service");
var moment = require("moment"); //for date API

//Function for pagination
const pagination = (posts, req) => {
  const pageCount = Math.ceil(posts.length / 10);
  let page = parseInt(req.query.p);
  if (!page) {
    page = 1;
  }
  if (page > pageCount) {
    page = pageCount;
  }

  return [page, pageCount];
};

//Function for Name and Description column sorting
const sortByColumn = (a, colIndex) => {
  const sortFunction = (a, b) => {
    if (a[colIndex] === b[colIndex]) {
      return 0;
    } else {
      return a[colIndex] < b[colIndex] ? -1 : 1;
    }
  };

  a.sort(sortFunction);

  return a;
};

// GET posts listing
router.get("/", async function (req, res, next) {
  let posts = await postService.getPosts();
  let totalPosts = posts.length;

  let [page, pageCount] = pagination(posts, req);

  let sortColumn = "";
  let sortBy = req.query.sortBy;
  if (req.query.sortColumn == "name") {
    posts = sortByColumn(posts, "name");
  } else if (req.query.sortColumn == "dateLastEdited") {
    posts = sortByColumn(posts, "dateLastEdited");
  }

  posts = posts.slice(page * 10 - 10, page * 10);

  res.render("posts", {
    title: "Posts",
    posts: posts,
    current: page,
    page: pageCount,
    totalPosts: totalPosts,
    req: req,
    moment: moment,
  });
});

//GET search posts listing
router.get("/search", async function (req, res, next) {
  let posts = await postService.searchRedis(req.query.q);

  let totalPosts = posts.length;

  let [page, pageCount] = pagination(posts, req);

  let sortColumn = "";
  let sortBy = req.query.sortBy;
  if (req.query.sortColumn == "name") {
    posts = sortByColumn(posts, "name");
  } else if (req.query.sortColumn == "dateLastEdited") {
    posts = sortByColumn(posts, "dateLastEdited");
  }
  posts = posts.slice(page * 10 - 10, page * 10);

  res.render("posts", {
    title: "Posts",
    posts: posts,
    current: page,
    page: pageCount,
    totalPosts: totalPosts,
    req: req,
    moment: moment,
  });
});

module.exports = router;
