const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("..");
const Product = require("../../db/models/Product");
const connectDataBase = require("../../db");

let server;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const connectionString = server.getUri();

  await connectDataBase(connectionString);
});

beforeEach(async () => {
  await Product.create({
    price: 10,
    title: "Silla",
    description: "Una silla preciosa",
    category: "mueble",
  });
  await Product.create({
    price: 11,
    title: "Bici",
    description: "Una bici preciosa",
    category: "deportes",
  });
});

afterEach(async () => {
  await Product.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a /products/list/ endpoint ", () => {
  describe("When it receives a GET ", () => {
    test("Then it should return with 200 status code", async () => {
      const { body } = await request(app).get("/products/list").expect(200);

      expect(body.products).toHaveLength(2);
    });
  });
});
