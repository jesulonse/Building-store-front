import { Application, Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import { authToken } from "./authToken";

const newProductStore = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await newProductStore.index();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };
    const created = await newProductStore.create(product);
    res.json(created);
  } catch (error) {
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await newProductStore.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await newProductStore.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const updated = await newProductStore.update(req.body.id, product);
    res.json(updated);
  } catch (error) {
    res.json(error);
  }
};

const productRoutes = (app: Application) => {
  app.get("/products", index);
  app.post("/products", authToken, create);
  app.get("/products/:id", show);
  app.delete("/products", authToken, destroy);
  app.put("/products", authToken, update);
};

export default productRoutes;
