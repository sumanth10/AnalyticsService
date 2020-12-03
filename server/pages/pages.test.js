const request = require("supertest");
const app = require("../../index");
const dbhandler = require("../helpers/test.dbhandler");

let token;

beforeAll(async (done) => {
  await dbhandler.connect();
  request(app)
    .post("/api/auth/login")
    .send({
      username: "admin",
      password: "admin",
    })
    .end((err, response) => {
      token = response.body.token;
      done(); // save the token!
    });
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbhandler.closeDatabase());

describe("Pages Endpoints", () => {
  it("It should fail without authorization token ", async (done) => {
    const res = await request(app).get("/api/pages");
    expect(res.statusCode).toEqual(401);
    done();
  });

  it("should create a new page entry", async (done) => {
    const res = await request(app)
      .post("/api/pages")
      .set("Authorization", `${token}`)
      .set('Accept', 'application/json')
      .set('Content-Type','application/json')
      .send(
       {
          pageID: "2",
          countryID: "ENG",
          browserID: "fk",
          userID: "99",
          pageName: "Order",
        })
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("_id");
    done();
  });

  it("should fetch a page details", async (done) => {
    const pageID = 2;
    
    const res = await request(app)
      .get(`/api/pages/${pageID}`)
      .set("Authorization", `${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("pages");
    expect(res.body.pages[0].pageID).toEqual("2")
    done();
  });

  it("should fetch a page details by countries", async (done) => {
    const pageID = 2;
    const expected = [{"_id": "ENG", "value": 1}];
    const res = await request(app)
      .get(`/api/pages/${pageID}/country`)
      .set("Authorization", `${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.arrayContaining(expected));
    done();
  });

});
