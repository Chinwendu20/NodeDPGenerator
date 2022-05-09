import supertest from "supertest"
const request = supertest("http://127.0.0.1:3000");
import { expect } from "chai";


var id=28

describe("Unsuccesful DELETE /campaign/:id", function () {
  it("id does not exist", async function () {
    var id=100
    const response = await request
      .delete(`/campaign/${id}`)
      .set('Content-Type', 'application/json')



    expect(response.status).to.eql(400)
    expect(response.body).to.have.keys("error");
    expect(response.body.error).to.eql("Invalid request, id does not exist");

   
  });
});



describe("Succesful DELETE /campaign/:id", function () {
  it("Request is successful", async function () {
    const response = await request
      .delete(`/campaign/${id}`)
      .set('Content-Type', 'application/json')


    expect(response.status).to.eql(204)
    expect(response.body).to.be.empty;
  });
});
