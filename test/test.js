const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;
const app = require("../app");

describe("Restful API", function () {
  it("should return 200 OK with several posts", async function () {
    const response = await request(app)
      .get("/api/posts")
      .expect(200)
      .expect("Content-Type", /json/);

    const posts = response.body;
    expect(posts).to.be.an("array");
    expect(posts).length.to.be.greaterThan(0);
  });
});
