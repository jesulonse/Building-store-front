import { Application, Request, Response } from "express";
import { Order, ProductOrder, OrderStore } from "../models/order";
import { authToken } from "./authToken";

const newOrderStore = new OrderStore();

const index = async (req: Request, res: Response) => {
  try {
    const orders = await newOrderStore.index();
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status,
    };
    const created = await newOrderStore.createOrder(order);
    res.json(created);
  } catch (error) {
    res.json(error);
  }
};

const showByOrderID = async (req: Request, res: Response) => {
  try {
    const user = await newOrderStore.showByOrderID(req.params.id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const showByUserID = async (req: Request, res: Response) => {
  try {
    const user = await newOrderStore.showByUserID(req.params.id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await newOrderStore.deleteOrder(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

const createProductOrder = async (req: Request, res: Response) => {
  try {
    const order: ProductOrder = {
      product_id: req.body.product_id,
      order_id: req.body.order_id,
      quantity: req.body.quantity,
    };
    const created = await newOrderStore.createProductOrder(order);
    res.json(created);
  } catch (error) {
    res.json(error);
  }
};

const deleteProductOrder = async (req: Request, res: Response) => {
  try {
    const deleted = await newOrderStore.deleteProductOrder(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

const orderRoutes = (app: Application) => {
  app.get("/orders", authToken, index);
  app.post("/orders", authToken, createOrder);
  app.get("/orders/:id", authToken, showByOrderID);
  app.get("/orders/user/:id", authToken, showByUserID);
  app.delete("/orders", authToken, deleteOrder);
  app.post("/orders/product", authToken, createProductOrder);
  app.delete("/orders/product", authToken, deleteProductOrder);
};

export default orderRoutes;
