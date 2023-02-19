import { Application, Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";
import { authToken } from "./authToken";

const newUserStore = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await newUserStore.index();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const created = await newUserStore.create(user);

    let token = jwt.sign(
      { user: created },
      process.env.TOKEN_SECRET as string
    ) as string;

    res.json(token);
  } catch (error) {
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await newUserStore.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await newUserStore.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
    };

    const updated = await newUserStore.update(req.body.id, user);
    res.json(updated);
  } catch (error) {
    res.json(error);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as unknown as string;
    const password = req.body.password as unknown as string;

    if (id === undefined || password === undefined) {
      res.status(400);
      res.send("ID or Password are missing");
      return false;
    }

    const user: User | null = await newUserStore.authenticate(id, password);
    let token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);

    if (user === null) {
      res.status(401);
      res.send(`Wrong password for user with id ${id}.`);

      return false;
    }

    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const userRoutes = (app: Application) => {
  app.get("/users", authToken, index);
  app.post("/users", create);
  app.get("/users/:id", authToken, show);
  app.delete("/users", authToken, destroy);
  app.put("/users", authToken, update);
  app.post("/users/authenticate", authenticate);
};

export default userRoutes;
