import request from "supertest";
import app from "../src/app.js";

describe("Auth API", () => {

  const user = {
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    password: "123456"
	};

  it("should register user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({userDetails: user});

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

});