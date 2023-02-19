import { ProductStore } from "../models/product";

const store = new ProductStore();

//Testing if product methods are defined
it("product index method defined", () => {
  expect(store.index).toBeDefined();
});

it("product show method defined", () => {
  expect(store.show).toBeDefined();
});

it("product create method defined", () => {
  expect(store.create).toBeDefined();
});

it("product update method defined", () => {
  expect(store.update).toBeDefined();
});

it("product delete method defined", () => {
  expect(store.delete).toBeDefined();
});
//

//testing if product methods works as intended
it("product name created", async () => {
  const productCreated = await store.create({
    name: "Banana",
    price: 15,
  });
  expect(productCreated.name).toEqual("Banana");
});

it("product price created", async () => {
  const productCreated = await store.create({
    name: "Orange",
    price: 10,
  });
  expect(productCreated.price).toEqual(10);
});

it("product index method resturns a list of products", async () => {
  const productIndexList = await store.index();
  expect(productIndexList.length).toEqual(2);
});

it("show product by product id method returned the correct product", async () => {
  const product = await store.show("1");
  expect(product.id).toEqual(1);
});

it("product delete method works as intented", async () => {
  const deletedProduct = await store.delete("2");
  expect(deletedProduct.id).toEqual(2);
});

it("product updated as intended", async () => {
  const updatedOrder = await store.update("1", {
    name: "Apples",
    price: 5,
  });
  expect(updatedOrder).toEqual({
    id: 1,
    name: "Apples",
    price: 5,
  });
});
//
