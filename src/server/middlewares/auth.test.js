const jwt = require("jsonwebtoken");
const auth = require("./auth");

describe("Given an auth middleware ", () => {
  describe("When it gets a request with empty header", () => {
    test("Then it should call next with 'Token missing' error", () => {
      const req = {
        header: jest.fn(),
      };
      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      const expectedError = new Error("Token missing");

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it gets a request without token", () => {
    test("Then it should call next 'wrong token' error", () => {
      const token = "aqui hay token";

      const req = {
        header: jest.fn().mockReturnValue(token),
      };
      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      const expectedError = new Error("Wrong token");

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it gets a request with a correct authorization", () => {
    test("Then it should call next", () => {
      const user = "aqui hay los datos de un user";
      const id = "33";
      jwt.verify = jest.fn().mockResolvedValue(user);
      jwt.decode = jest.fn().mockResolvedValue(id);

      const req = {
        header: jest.fn().mockReturnValue(user),
        userId: jest.fn().mockReturnValue(id),
      };

      const res = {};
      const next = jest.fn();

      auth(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
