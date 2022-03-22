const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("..");
const User = require("../../db/models/User");
const connectDataBase = require("../../db");

let server;
beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const connectionString = server.getUri();

  await connectDataBase(connectionString);
});

beforeEach(async () => {
  const password = await bcrypt.hash("1234", 10);
  await User.create({
    id: "1234",
    name: "Pepe",
    username: "Pepon",
    email: "email@email.jpg",
    password,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a /user/register/ endpoint ", () => {
  describe("When it receives a POST and a no valid req", () => {
    test("Then it should return with 400 status code", async () => {
      const user = {
        name: "Pepito",
        username: "Pepon",
        email: "email@email.jpg",
        picture: "foto.jpg",
        password: "1234",
      };

      const { body } = await request(app)
        .post("/user/register")
        .send(user)
        .expect(400);

      expect(body.username).not.toBe(user.username);
    });
  });
});
