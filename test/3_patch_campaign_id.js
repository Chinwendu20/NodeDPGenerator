import supertest from "supertest"
const request = supertest("http://127.0.0.1:3000");
import { expect } from "chai";



var id=28
var slug='polop'


describe("Unsuccesful PATCH /campaign/:id", function () {
  it("id does not exist", async function () {
    var id=100
    var slug=process.env.slug
    const response = await request
      .patch(`/campaign/${id}`)
      .set('Content-Type', 'multipart/form-data')
      .field('height', '240')
      .field('width', '240')
      .field('position_y', '234')
      .field('border_radius', '3')
      .field('name', 'A test campaign')
      .field('description', 'Description for a test campaign')
      .attach('user_photo', './test_images/frame.jpeg');


    expect(response.status).to.eql(400)
    expect(response.body).to.have.keys("error");
    expect(response.body.error).to.eql("Invalid request, id does not exist");

   
  });
});



describe("Unsuccesful PATCH /campaign/:id", function () {
  it("Link already in DB", async function () {
    const response = await request
      .patch(`/campaign/${id}`)
      .set('Content-Type', 'multipart/form-data')
      .field('link', slug)
      .field('height', '240')
      .field('width', '240')
      .field('position_y', '234')
      .field('border_radius', '3')
      .field('name', 'A test campaign')
      .field('description', 'Description for a test campaign')
      .attach('user_photo', './test_images/frame.jpeg');


    expect(response.status).to.eql(500)
    expect(response.body).to.have.keys("error");
    expect(response.body.error).to.eql("Link already in use");

   
  });
});


describe("Succesful PATCH /campaign/:id", function () {
  it("Request is successful", async function () {
    const response = await request
      .patch(`/campaign/${id}`)
      .set('Content-Type', 'multipart/form-data')
      .field('height', '240')
      .field('width', '240')
      .field('position_y', '234')
      .field('border_radius', '3')
      .field('name', 'A test campaign')
      .field('description', 'Description for a test campaign')
      .attach('user_photo', './test_images/frame.jpeg');


    expect(response.status).to.eql(200)
    expect(response.body[0]).to.include.all.keys('id', 'link', 'height', 'width', 'position_x', 'position_y', 'name', 'description', 'banner');

   
  });
});
