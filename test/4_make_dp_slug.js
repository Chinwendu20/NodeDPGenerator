import supertest from "supertest"
const request = supertest("http://127.0.0.1:3000");
import { expect } from "chai";



var slug='mappwayyotu'

describe("Unsuccesful POST /make/dp/:slug", function () {
  it("link does not exist", async function () {
    const response = await request
      
      .post(`/make/dp/linkdoesnotexist`)
      .set('Content-Type', 'multipart/form-data')
      .attach('user_photo', './test_images/profile-pic.png')

    expect(response.status).to.eql(500)
    expect(response.body).to.have.keys("error");
    expect(response.body.error).to.eql("link does not exist");

   
  });
});

describe("Succesful POST /make/dp/:slug", function () {
  it("Request is successful", async function () {
    const response = await request

      .post(`/make/dp/${slug}`)
      .set('Content-Type', 'multipart/form-data')
      .attach('user_photo', './test_images/profile-pic.png')


    console.log(response.body.url)
    expect(response.status).to.eql(201)
    expect(response.body).to.include.all.keys('url');
    expect(response.body.url).to.have.string('cloudinary');

   
  });
});




