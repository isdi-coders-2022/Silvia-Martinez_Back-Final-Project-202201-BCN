const Product = require("../../db/models/Product");
const getAllProducts = require("./productControllers");

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
});
