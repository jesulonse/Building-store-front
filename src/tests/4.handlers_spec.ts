import supertest from "supertest";
import app from "../server";
const request = supertest(app);

//where we will store the token when we create a user
let token: String;

//testing user creation first in order to get a token
it("/user post request response is 200 and returns a token", async () => {
  const user = {
    firstname: "Andrew",
    lastname: "Samir",
    password: "Password",
  };

  const response = await request.post("/users").send(user);
  token = response.body;
  expect(response.status).toBe(200);
});

//testing products routes
it("/products get request response is 200", async () => {
  const response = await request.get("/products");
  expect(response.status).toBe(200);
});

it("/products/:id get request response is 200", async () => {
  const response = await request.get("/products/1");
  expect(response.status).toBe(200);
});

it("/product post request with token response is 200", async () => {
  const product = {
    name: "Potatoes",
    price: 10,
  };

  const response = await request
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});
//

//testing remaining user routes
it("/users get request with token response is 200", async () => {
  const response = await request
    .get("/users")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});

it("/users/:id get request with token response is 200", async () => {
  const response = await request
    .get("/users/1")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});
//

//testing order routes
it("/orders get request with token response is 200", async () => {
  const response = await request
    .get("/orders")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});

it("/orders/:id get request with token response is 200", async () => {
  const response = await request
    .get("/orders/1")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});

it("/orders/user/:id get request with token response is 200", async () => {
  const response = await request
    .get("/orders/user/1")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});

it("/orders post request with token response is 200 ", async () => {
  const order = {
    product_id: "1",
    quantity: 10,
    user_id: "1",
    status: "pending",
  };
  const response = await request
    .post("/orders")
    .send(order)
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
});
//
