import supertest from "supertest"
const request = supertest("http://127.0.0.1:3000");
import { expect } from "chai";


var slug='polop'

describe("Successful GET /:slug", function () {
  it("Successfully obtains data about a particular campaign", async function () { 
    const response = await request.get(`/${slug}`);
    expect(response.status).to.eql(200);
    expect(response.body[0]).to.include.all.keys('id','link', 'height', 'width', 'position_x', 'position_y', 'name', 'description', 'banner');
    

  });
});

describe(" Unsuccessful GET /:slug", function () {
  it("Incorrect slug", async function () {
    const response = await request.get('/doesnotexist');

    expect(response.status).to.eql(500);
    expect(response.body).to.have.keys("error");
    expect(response.body.error).to.eql("Record does not exist");
    });
});