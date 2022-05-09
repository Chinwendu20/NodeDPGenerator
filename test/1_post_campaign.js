import supertest from "supertest"
const request = supertest("http://127.0.0.1:3000");
import { expect } from "chai"



var link='breappok'
var height='240'
var width='240'
var position_y='234'
var position_x='242'
var name= 'A test campaign'
var description='This is a test campaign'
var banner='./test_images/frame.jpeg'
var border_radius=3



describe("Unsuccesful POST /campaign", function () {
  it("position_x is a required field", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('height', height)
      .field('width', width)
      .field('position_y', position_y)
      .field('border_radius', position_x)
      .field('name', name)
      .field('description', description)
      .attach('banner', banner);


    expect(response.status).to.eql(500)
    expect(response.body).to.include.members(['"position_x" is required']);

   
  });
});



describe("Unsuccesful POST /campaign", function () {
  it("link is a required field", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('height', height)
      .field('width', width)
      .field('position_x', position_x)
      .field('position_y', position_y)
      .field('border_radius', border_radius)
      .field('name', name)
      .field('description', description)
      .attach('banner', banner);

    expect(response.status).to.eql(500)
    expect(response.body).to.include.members(['"link" is required']);
   
  });
});



describe("Unsuccesful POST /campaign", function () {
  it("height is a required field", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('width', width)
      .field('position_x', position_x)
      .field('position_y', position_y)
      .field('border_radius', border_radius)
      .field('name', name)
      .field('description', description)
      .attach('banner', banner);
    expect(response.status).to.eql(500)
    expect(response.body).to.include.members(['"height" is required']);
   
  });
});



describe("Unsuccesful POST /campaign", function () {
  it("width is a required field", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('height', height)
      .field('border_radius', border_radius)
      .field('position_x', position_x)
      .field('position_y', position_y)
      .field('name', name)
      .field('description', description)
      .attach('banner', banner);

     
    expect(response.status).to.eql(500)
    expect(response.body).to.include.members(['"width" is required']);
   
  });
});



describe("Unsuccesful POST /campaign", function () {
  it("position_y is a required field", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('height', height)
      .field('width', width)
      .field('position_x', position_x)
      .field('border_radius', border_radius)
      .field('name', name)
      .field('description', description)
      .attach('banner', banner);

 
    expect(response.status).to.eql(500)
    expect(response.body).to.include.members(['"position_y" is required']);

  });
});



describe("Unsuccesful POST /campaign", function () {
  it("name is a required field", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('height', height)
      .field('width', width)
      .field('position_x', position_x)
      .field('position_y', position_y)
      .field('border_radius', border_radius)
      .field('description', description)
      .attach('banner', banner);

    expect(response.status).to.eql(500)
    expect(response.body).to.include.members(['"name" is required']);
   
  });
});



describe("Unsuccesful POST /campaign", function () {
  it("description is a required field", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('height', height)
      .field('width', width)
      .field('position_x', position_x)
      .field('position_y', position_y)
      .field('name', name)
      .field('border_radius', border_radius)
      .attach('banner', banner);

     
    expect(response.status).to.eql(500)
    expect(response.body).to.include.members(['"description" is required']);
   
  });
});



describe("Unsuccesful POST /campaign", function () {
  it("banner is a required field", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('height', height)
      .field('width', width)
      .field('position_x', position_x)
      .field('position_y', position_y)
      .field('name', name)
      .field('description', description)
      .field('border_radius', border_radius)
    expect(response.status).to.eql(500)
    expect(response.body).to.have.keys("error");
    expect(response.body.error).to.eql("banner field is required");

  });
});


describe("Succesful POST /campaign", function () {
  it("Request is successful", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('height', height)
      .field('width', width)
      .field('position_x', position_x)
      .field('position_y', position_y)
      .field('name', name)
      .field('description', description)
      .attach('banner', banner);


    expect(response.status).to.eql(201)
    expect(response.body).to.include.all.keys('link', 'height', 'width', 'position_x', 'position_y', 'name', 'description', 'banner');
    expect(response.body.banner).to.have.string('cloudinary');

  });
});



describe("Unsuccesful POST /campaign", function () {
  it("Link should be unique", async function () {
    const response = await request
      .post("/campaign")
      .set('Content-Type', 'multipart/form-data')
      .field('link', link)
      .field('height', height)
      .field('width', width)
      .field('position_x', position_x)
      .field('position_y', position_y)
      .field('name', name)
      .field('description', description)
      .attach('banner', banner);




    expect(response.status).to.eql(500)
    expect(response.body).to.have.keys("error");
    expect(response.body.error).to.eql("Link already in use");

   
  });
});












