import request from "supertest";
import app from "../src/app.js";

let token = "";

beforeAll(async () => {
	const user = {
		name: "Test User",
		email: `test${Date.now()}@example.com`,
		password: "123456"
	};

  const res = await request(app)
    .post("/api/auth/register")
    .send({userDetails: user});

  token = res.body.token;
});

describe("Activity API", () => {

  it("should create activity", async () => {
    const res = await request(app)
      .post("/api/activities")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2026-03-30",
        type: "Running",
        duration: 30,
        notes: "Test run"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.type).toBe("Running");
  });

  it("should get activities", async () => {
    const res = await request(app)
      .get("/api/activities")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});