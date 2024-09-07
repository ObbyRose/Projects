const request = require("supertest");
const app = require("../server.js"); // Adjust this path to point to your Express app

describe("GET /products", () => {
  it("should response with code 200", async () => {
    const response = await request(app).get(`/products`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});

describe("GET /products/1", () => {
  it("should response with code 200", async () => {
    const response = await request(app).get(`/products/1`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
  it("id matches item number 1", async () => {
    const response = await request(app).get(`/products/1`);
    expect(response.body.id).toBeDefined();
    expect(response.body.id).toBe(1);
    expect(response.body.title).toBeDefined();
    expect(response.body.title).toBe(
      "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    );
    expect(response.body.price).toBeDefined();
    expect(response.body.price).toBe(109.95);
    expect(response.body.category).toBeDefined();
    expect(response.body.category).toBe("men's clothing");
    expect(response.body.description).toBeDefined();
    expect(response.body.description).toBe(
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
    );
    expect(response.body.image).toBeDefined();
    expect(response.body.image).toBe(
      "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    );
    expect(response.body.rating).toBeDefined();
    // expect(response.body.rating.rate).toBeDefined();
    expect(response.body.rating.rate).toBe(3.9);
    // expect(response.body.rating.count).toBeDefined();
    expect(response.body.rating.count).toBe(120);
  });
});

describe("GET /products/3", () => {
  it("should respond with code 200 and the correct product data", async () => {
    const response = await request(app).get(`/products/3`);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body).toBeDefined();
    expect(body.id).toBeDefined();
    expect(body.title).toBeDefined();
    expect(body.price).toBeDefined();
    expect(body.price).toBe(55.99);
    expect(body.description).toBeDefined();
    expect(body.category).toBeDefined();
    expect(body.image).toBeDefined();
    expect(body.rating).toBeDefined();

    expect(body.rating.rate).toBeDefined();
    expect(body.rating.rate).toBe(4.7);
    expect(body.rating.count).toBeDefined();
    expect(body.rating.count).toBe(500);
  });
});

describe("GET /products/1448", () => {
  it("should response with code 404", async () => {
    const response = await request(app).get(`/products/1448`);
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
});

describe("GET /prdaf", () => {
  it("should response with code 404", async () => {
    const response = await request(app).get(`/prdaf`);
    expect(response.statusCode).toBe(404);
  });
});

describe("post /products", () => {
  it("should response with code 200", async () => {
    const product = {
      title: "test product",
      price: 13.5,
      description: "lorem ipsum set",
      image: "https://i.pravatar.cc",
      category: "electronic",
    };
    const response = await request(app).post(`/api/products`).send(product);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
  });
});
