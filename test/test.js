const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;
const app = require("../app");

before("Restful API", function () {
  it("should return 200 OK with all the posts", async function () {
    const response = await request(app)
      .get("/api/posts")
      .expect(200)
      .expect("Content-Type", /json/);

    const posts = response.body;
    expect(posts).to.be.an("array");
    expect(posts).length.to.be.greaterThan(0);
    posts.forEach(post => {
      expect(post.name).to.be.a("string");
      expect(post.image).to.be.a("string");
      expect(post.description).to.be.a("string");
      expect(post.dateLastEdited).to.be.a("string");
    });
  });
});

describe("Restful API", function () {
  it("should return 200 OK with all posts", async function () {
    const response = await request(app)
      .get("/api/posts/searchRedis")
      .expect(200)
      .expect("Content-Type", /json/);

    const posts = response.body;
    expect(posts).to.be.an("array");
    expect(posts).length.to.be.greaterThan(0);
  });
});

describe("Restful API", function () {
  it("should return 200 OK with searched query result", async function () {
    const response = await request(app)
      .get("/api/posts/searchRedis?q=dilshad")
      .expect(200)
      .expect("Content-Type", /json/);

    const posts = response.body;
    expect(posts).to.be.an("array");  
    expect(posts).length.to.be.greaterThan(0);
  });
});
