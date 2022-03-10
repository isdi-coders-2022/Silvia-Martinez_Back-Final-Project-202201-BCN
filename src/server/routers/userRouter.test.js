const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("..");
const connectDataBase = require("../../db");
const User = require("../../db/models/User");

let server;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const connectionString = server.getUri();

  await connectDataBase(connectionString);
});

beforeEach(async () => {
  await User.create({
    name: "pepe",
    user: "pepito",
    picture: "foto.jpg",
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a /user/perfil/ endpoint ", () => {
  describe("When it receives a GET ", () => {
    test("Then it should return with 200 status code", async () => {
      const { body } = await request(app).get("/user/perfil").expect(200);

      expect(body.user).toHaveLength(1);
    });
  });
});
