const { errorNotFound, generalError } = require("./errors");

describe("Given a midleware error not found", () => {
  describe("When it's called with a request and a response", () => {
    test("Then it should return a code status 404", () => {
      const expectedStatus = 404;
      const expectedJSON = { error: true, message: "Not found" };
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const req = {};
      const res = { status: mockStatus, json: mockJson };

      errorNotFound(req, res);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson).toHaveBeenCalledWith(expectedJSON);
    });
  });
});

describe("Given a general error middleware", () => {
  describe("When it's called with error and a response", () => {
    test("Then it should response wiht a status 400 and message error", () => {
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const err = { status: 400, message: "errorerror" };
      const res = { status: mockStatus, json: mockJson };
      const errorMessage = { error: err.message };
      const req = null;
      const next = null;

      generalError(err, req, res, next);

      expect(mockStatus).toHaveBeenCalledWith(err.status);
      expect(mockJson).toHaveBeenCalledWith(errorMessage);
    });
  });
  describe("When it's called with error and a response", () => {
    test("Then it should response wiht a status 500 and message error", () => {
      const expectedStatus = 500;
      const expectedJSON = { error: "server error" };
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const err = {};
      const res = { status: mockStatus, json: mockJson };
      const req = null;
      const next = null;
      generalError(err, req, res, next);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson).toHaveBeenCalledWith(expectedJSON);
    });
  });
});
