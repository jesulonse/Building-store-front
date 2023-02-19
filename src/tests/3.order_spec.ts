import { OrderStore } from "../models/order";

const store = new OrderStore();

//Testing if order methods are defined
it("order index method defined", () => {
  expect(store.index).toBeDefined();
});

it("order show by id method defined", () => {
  expect(store.showByOrderID).toBeDefined();
});

it("order show by user id method defined", () => {
  expect(store.showByUserID).toBeDefined();
});

it("order create method defined", () => {
  expect(store.createOrder).toBeDefined();
});

it("order delete method defined", () => {
  expect(store.deleteOrder).toBeDefined();
});

it("product order create method defined", () => {
  expect(store.createProductOrder).toBeDefined();
});

it("product order delete method defined", () => {
  expect(store.deleteProductOrder).toBeDefined();
});
//

//testing if order methods works as intended
it("order created as intended", async () => {
  const orderCreated = await store.createOrder({
    user_id: "1",
    status: "pending",
  });
  expect(orderCreated).toEqual({
    id: 1,
    user_id: "1",
    status: "pending",
  });
});

it("show order by order id method returned the correct order", async () => {
  const order = await store.showByOrderID("1");
  expect(order.id).toEqual(1);
});

it("order index method resturns a list of products", async () => {
  const orderIndexList = await store.index();
  expect(orderIndexList.length).toEqual(1);
});

it("order delete method works as intented", async () => {
  const deletedOrder = await store.deleteOrder("1");
  expect(deletedOrder.id).toEqual(1);
});

it("order created as intended", async () => {
  const orderCreated = await store.createOrder({
    user_id: "1",
    status: "pending",
  });
  expect(orderCreated).toEqual({
    id: 2,
    user_id: "1",
    status: "pending",
  });
});

it("product order created as intended", async () => {
  const productOrderCreated = await store.createProductOrder({
    product_id: "1",
    order_id: "2",
    quantity: 10,
  });
  expect(productOrderCreated).toEqual({
    id: 1,
    product_id: "1",
    order_id: "2",
    quantity: 10,
  });
});

it("product order delete method works as intented", async () => {
  const deletedProductOrder = await store.deleteProductOrder("1");
  expect(deletedProductOrder.id).toEqual(1);
});

//
