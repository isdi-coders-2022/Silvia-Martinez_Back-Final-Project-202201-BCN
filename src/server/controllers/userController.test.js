require("dotenv").config();
const bcrypt = require("bcrypt");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { default: mongoose } = require("mongoose");
const connectDB = require("../../db");
const User = require("../../db/models/User");
const uploadPicture = require("../../utils/uploadPicture");
const { userRegister, userLogin } = require("./userController");

jest.mock("../../utils/uploadPicture");
jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: jest.fn().mockReturnValue("token"),
}));

let server;
beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const uri = server.getUri();
  connectDB(uri);
});

beforeEach(async () => {
  const cryptPassword = await bcrypt.hash("1234", 10);
  await User.create({
    name: "Pepe",
    username: "Pepon",
    email: "email@email.jpg",
    image: "foto.jpg",
    password: cryptPassword,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a user register controller", () => {
  describe("When it receives a request with valid data", () => {
    test("Then it should call methods status and json of next of res with 201", async () => {
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const res = { status: mockStatus, json: mockJson };

      const req = {
        body: {
          name: "Pepe",
          username: "Pepito",
          email: "email@email.jpg",
          image: "foto.jpg",
          password: "123",
        },
      };

      const newUser = {
        name: "Pepe",
        username: "Pepito",
        email: "email@email.jpg",
        image: "foto.jpg",
        password: "passwordEncripted",
      };

      User.findOne = jest.fn().mockResolvedValue(false);
      User.create = jest.fn().mockResolvedValue(newUser);
      const url = "unaurl.com";

      uploadPicture.mockResolvedValue(url);

      await userRegister(req, res);

      expect(res.json).toHaveBeenCalledWith({
        name: "Pepe",
        username: "Pepito",
      });
    });
    describe("When error ocsurs", () => {
      jest.mock("../../db/models/User", () => ({
        User: () => {
          throw new Error();
        },
      }));
      test("Then the method next should be called", async () => {
        const user = {
          name: "joselito",
          username: "joselit0",
          password: 1234,
        };
        const res = null;
        const req = { body: user };
        const next = jest.fn();

        await userRegister(req, res, next);

        expect(next).toHaveBeenCalled();
      });
    });
  });

  describe("When it receives a request with an existing username", () => {
    test("Then it should return a error", async () => {
      const error = new Error("username taken");
      const next = jest.fn();
      const req = {
        body: {
          name: "Pepe",
          username: "Pepon",
          email: "email@email.jpg",
          image: "foto.jpg",
          password: "1234",
        },
      };

      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const res = { status: mockStatus, json: mockJson };

      User.findOne = jest.fn().mockResolvedValue({ username: "test" });

      await userRegister(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
describe("Given a login controller", () => {
  describe("When it receives a request with a valid data", () => {
    test("Then the user should receives a token", async () => {
      const res = {
        json: jest.fn(),
      };
      const req = {
        body: { username: "Pepe", password: "1234" },
      };
      const token = "token";

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });
  describe("When it receives a request with a invalid password", () => {
    test("Then it should call next wiht and error", async () => {
      const res = {
        json: jest.fn(),
      };
      const req = {
        body: { username: "Pepe", password: "1235" },
      };

      const next = jest.fn();
      const error = new Error("Incorrect password or username");

      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request with a invalid password", () => {
    test("Then it should call next wiht and error", async () => {
      const res = {
        json: jest.fn(),
      };
      const req = {
        body: { username: "Pepin", password: "1234" },
      };

      const next = jest.fn();
      const error = new Error("Incorrect password or username");

      User.findOne = jest.fn().mockResolvedValue(false);

      await userLogin(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
