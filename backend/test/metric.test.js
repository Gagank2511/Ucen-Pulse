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

describe("Metric API", () => {

  it("should create metric", async () => {
    const res = await request(app)
      .post("/api/metrics")
      .set("Authorization", `Bearer ${token}`)
      .send({
        date: "2026-03-30",
        metric: "steps",
        value: 5000
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.metric).toBe("steps");
  });

  it("should fetch metrics", async () => {
    const res = await request(app)
      .get("/api/metrics")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});