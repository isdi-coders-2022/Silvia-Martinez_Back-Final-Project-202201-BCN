const Product = require("../../db/models/Product");
const {
  getAllProducts,
  getUserProducts,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("./productControllers");

jest.mock("../../db/models/Product");

describe("Given a getAllProducts controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should cal method json with a list of products", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const products = [
        {
          price: 10,
          title: "Silla",
          description: "Una silla preciosa",
          category: "mueble",
        },
      ];
      Product.find = jest.fn().mockResolvedValue(products);

      await getAllProducts(null, res);

      expect(Product.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ products });
    });
  });
  describe("When occurred an error", () => {
    test("Then it should called method next with an error", async () => {
      const req = null;
      const res = null;
      const next = jest.fn();

      await getAllProducts(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
describe("Given a getUserProducts controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should cal method json with a list of products", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = jest.fn().mockReturnThis();
      const id = "1234";
      req.userId = id;

      Product.find = jest.fn().mockResolvedValue({ userID: req.userId });

      await getUserProducts(req, res);

      expect(Product.find).toHaveBeenCalled();
    });
  });
  describe("When occurred an error", () => {
    test("Then it should called method next with an error", async () => {
      const req = null;
      const res = null;
      const next = jest.fn();

      await getUserProducts(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
describe("Given a deleteProduct controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a response", () => {
    test("Then it should call res json method with deleted product", async () => {
      const product = {
        id: "1234",
        price: 10,
        title: "Silla",
        description: "Una silla preciosa",
        category: "mueble",
      };

      const req = { params: { id: product.id } };

      const res = { json: jest.fn() };

      Product.findByIdAndDelete = jest.fn().mockResolvedValue(product);

      await deleteProduct(req, res, null);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives a not valid id", () => {
    test("Then it should call nex with an error and code 404", async () => {
      const product = {
        id: "1234",
        price: 10,
        title: "Silla",
        description: "Una silla preciosa",
        category: "mueble",
      };

      const req = { params: { idProduct: product.id } };

      const next = jest.fn();
      const error = new Error("Product not found");
      error.status = 404;

      Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      await deleteProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a create Product controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request with a new product ", () => {
    test("Then it should call method status and json and next of res with 201", async () => {
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const expectedStatus = 201;
      const res = {
        status: mockStatus,
        json: mockJson,
      };
      const next = null;
      const req = {
        body: {
          id: "1234",
          price: 10,
          title: "Silla",
          description: "Una silla preciosa",
          category: "mueble",
        },
      };

      Product.create = jest.fn().mockResolvedValue(req);

      await createProduct(req, res, next);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson).toHaveBeenCalled();
    });
  });
  describe("When it receives a not valid data", () => {
    test("Then it should call nex with an error and code 404", async () => {
      const req = {
        body: {
          id: "1234",
          price: 10,
          title: "Silla",
          description: "Una silla preciosa",
          category: "mueble",
        },
      };

      const next = jest.fn();
      const error = new Error("Product not found");
      error.status = 404;

      Product.create = jest.fn().mockResolvedValue(null);
      await createProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a updateProdcuct controller", () => {
  describe("When it receives a request with a updated data ", () => {
    test("Then it should call method status and json and next of res with 200", async () => {
      const mockStatus = jest.fn().mockReturnThis();
      const mockJson = jest.fn();
      const expectedStatus = 200;
      const res = {
        status: mockStatus,
        json: mockJson,
      };

      const product = {
        id: "1234",
        price: 10,
        title: "Silla",
        description: "Una silla preciosa",
        category: "mueble",
      };

      const req = { params: { idProduct: product.id } };

      const next = null;

      Product.findByIdAndUpdate = jest.fn().mockResolvedValue(req);

      await updateProduct(req, res, next);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson).toHaveBeenCalled();
    });
  });
  describe("When it receives a request with no valid id", () => {
    test("Then it should call nex with an error and code 404", async () => {
      const product = {
        id: "--novalid",
        price: 10,
        title: "Silla",
        description: "Una silla preciosa",
        category: "mueble",
      };

      const req = { params: { idProduct: product.id } };
      const next = jest.fn();
      const error = new Error("Product not found");
      error.status = 404;

      Product.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
      await updateProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
