const Product = require("../../db/models/Product");
const {
  getAllProducts,
  getUserProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getProduct,
} = require("./productControllers");

const uploadPicture = require("../../utils/uploadPicture");

jest.mock("../../db/models/Product");
jest.mock("../../utils/uploadPicture");

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

describe("Given getProduct controller", () => {
  describe("When received a request", () => {
    test("Then it returns one product", async () => {
      const productId = "33";
      const product = {
        id: productId,
        title: "title",
      };
      const req = {
        params: {
          idProduct: productId,
        },
      };
      const status = jest.fn().mockReturnThis();

      const res = {
        status,
        json: jest.fn(),
      };

      Product.findById = jest.fn().mockReturnThis();
      Product.populate = jest.fn().mockResolvedValue(product);

      await getProduct(req, res);

      expect(res.json).toHaveBeenCalledWith({
        id: productId,
        title: "title",
      });
      expect(Product.findById).toHaveBeenCalledWith(productId);
      expect(Product.populate).toHaveBeenCalledWith("userID");
    });
  });
  describe("When occurred an error", () => {
    test("Then it should called method next with an error", async () => {
      const res = null;

      const req = {
        params: {
          idProduct: null,
        },
      };
      const next = jest.fn();

      await getProduct(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a getUserProducts controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("When it receives a request", () => {
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
        userID: "34",
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
      const error = new Error("Unauthorized to delete this product");
      error.status = 403;

      Product.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      await deleteProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request with error", () => {
    test("Then it should call next with an error and code 500", async () => {
      const product = {
        id: "1234",
        price: 10,
        title: "Silla",
        description: "Una silla preciosa",
        category: "mueble",
      };

      const req = { params: { idProduct: product.id } };

      const next = jest.fn();
      const error = new Error("Error");
      error.status = 500;

      Product.findByIdAndDelete = jest
        .fn()
        .mockRejectedValue(new Error("Error"));

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

      const url = "unaurl.com";

      uploadPicture.mockResolvedValue(url);
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
          userID: "34",
        },
      };

      const next = jest.fn();
      const error = new Error("Forbidden");
      error.status = 403;

      Product.create = jest.fn().mockResolvedValue(null);
      await createProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request with error", () => {
    test("Then it should call next with an error and code 500", async () => {
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
      const error = new Error("Error");
      error.status = 500;

      Product.create = jest.fn().mockRejectedValue(new Error("Error"));

      await createProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a updateProdcuct controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
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
        _id: "1234",
        price: 10,
        title: "Silla",
        description: "Una silla preciosa",
        picture: "unafoto.jpg",
        category: "mueble",
        userID: "34",
        adress: "diputacio, 37, barcelona",
      };

      const req = {
        params: { idProduct: product.id },
        body: product,
        userId: "34",
      };

      const next = null;

      Product.findById = jest
        .fn()
        .mockResolvedValue({ title: "silla antigua", userID: "34" });

      Product.findByIdAndUpdate = jest.fn().mockResolvedValue(product);

      await updateProduct(req, res, next);

      expect(mockStatus).toHaveBeenCalledWith(expectedStatus);
      expect(mockJson).toHaveBeenCalled();
    });
  });
  describe("When it receives a request with a updated data but not authorized user ", () => {
    test("Then it should call method call next with an error and code 401", async () => {
      const product = {
        _id: "1234",
        price: 10,
        title: "Silla",
        description: "Una silla preciosa",
        picture: "unafoto.jpg",
        category: "mueble",
        userID: "34",
        adress: "diputacio, 37, barcelona",
      };

      const req = {
        params: { idProduct: product.id },
        body: product,
        userId: "38",
      };

      const next = jest.fn();
      const error = new Error("Unauthorized to update this product");
      error.status = 401;

      Product.findById = jest
        .fn()
        .mockResolvedValue({ title: "silla antigua", userID: "34" });

      Product.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updateProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request with no valid id", () => {
    test("Then it should call next with an error and code 404", async () => {
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

      Product.findById = jest.fn().mockResolvedValue(null);

      await updateProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a request with error", () => {
    test("Then it should call next with an error and code 500", async () => {
      const product = {
        id: "--novalid",
        price: 10,
        title: "Silla",
        description: "Una silla preciosa",
        category: "mueble",
      };

      const req = { params: { idProduct: product.id } };
      const next = jest.fn();
      const error = new Error("Error");
      error.status = 500;

      Product.findById = jest.fn().mockRejectedValue(new Error("Error"));

      await updateProduct(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
