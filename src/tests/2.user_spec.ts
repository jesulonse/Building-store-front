import { UserStore } from "../models/user";
import bcrypt from "bcrypt";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

const store = new UserStore();

//Testing if user methods are defined
it("user index method defined", () => {
  expect(store.index).toBeDefined();
});

it("user show method defined", () => {
  expect(store.show).toBeDefined();
});

it("user create method defined", () => {
  expect(store.create).toBeDefined();
});

it("user update method defined", () => {
  expect(store.update).toBeDefined();
});

it("user delete method defined", () => {
  expect(store.delete).toBeDefined();
});
//

//testing if user methods works as intended
it("user firstname created", async () => {
  const userCreated = await store.create({
    firstname: "User A",
    lastname: "User A",
    password: "User A",
  });
  expect(userCreated.firstname).toEqual("User A");
});

it("user lastname created", async () => {
  const userCreated = await store.create({
    firstname: "User B",
    lastname: "User B",
    password: "User B",
  });
  expect(userCreated.firstname).toEqual("User B");
});

it("user hashed password is created as intended", async () => {
  const UserCreated = await store.create({
    firstname: "User C",
    lastname: "User C",
    password: "User C",
  });
  expect(
    bcrypt.compareSync("User C" + BCRYPT_PASSWORD, UserCreated.password)
  ).toBeTrue();
});

it("user index method resturns a list of users", async () => {
  const userIndexList = await store.index();
  expect(userIndexList.length).toEqual(3);
});

it("show user by user id method returned the correct user", async () => {
  const user = await store.show("1");
  expect(user.id).toEqual(1);
});

it("user updated as intended", async () => {
  const user = {
    firstname: "User D",
    lastname: "User D",
    password: "User D",
  };
  const updatedUser = await store.update("1", user);

  expect(
    bcrypt.compareSync("User D" + BCRYPT_PASSWORD, updatedUser.password)
  ).toBeTrue();
});

it("user delete method works as intented", async () => {
  const deletedUser = await store.delete("3");
  expect(deletedUser.id).toEqual(3);
});
//
