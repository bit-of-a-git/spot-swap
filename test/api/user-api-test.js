import { assert } from "chai";
import { spotswapService } from "./spotswap-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    spotswapService.clearAuth();
    await spotswapService.createUser(maggie);
    await spotswapService.authenticate(maggieCredentials);
    await spotswapService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[i] = await spotswapService.createUser(testUsers[i]);
    }
    await spotswapService.createUser(maggie);
    await spotswapService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await spotswapService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await spotswapService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await spotswapService.deleteAllUsers();
    await spotswapService.createUser(maggie);
    await spotswapService.authenticate(maggieCredentials);
    returnedUsers = await spotswapService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await spotswapService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await spotswapService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No user with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });

  test("get a user - deleted user", async () => {
    await spotswapService.deleteAllUsers();
    await spotswapService.createUser(maggie);
    await spotswapService.authenticate(maggieCredentials);
    try {
      const returnedUser = await spotswapService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No user with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});
