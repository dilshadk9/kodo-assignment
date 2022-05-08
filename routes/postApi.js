var express = require("express");
var router = express.Router();
var postService = require("../services/posts-service");

router.get("/", (req, res) => {
  res.send(postService.getPosts());
});

router.get("/search", (req, res) => {
  res.send(postService.searchPost(req.query.q));
});

router.get("/searchredis", async (req, res) => {
  res.send(await postService.searchRedis(req.query.q));
});

module.exports = router;
