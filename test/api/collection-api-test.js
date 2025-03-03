import { assert } from "chai";
import { spotswapService } from "./spotswap-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, galway, testCollections } from "../fixtures.js";

suite("Collection API tests", () => {
  let user = null;

  setup(async () => {
    spotswapService.clearAuth();
    user = await spotswapService.createUser(maggie);
    await spotswapService.authenticate(maggie);
    await spotswapService.deleteAllCollections();
    await spotswapService.deleteAllUsers();
    user = await spotswapService.createUser(maggie);
    await spotswapService.authenticate(maggie);
    galway.userId = user._id;
  });

  teardown(async () => {});

  test("create collection", async () => {
    const returnedCollection = await spotswapService.createCollection(galway);
    assert.isNotNull(returnedCollection);
    assertSubset(galway, returnedCollection);
  });

  test("delete a collection", async () => {
    const collection = await spotswapService.createCollection(galway);
    const response = await spotswapService.deleteCollection(collection._id);
    assert.equal(response.status, 204);
    try {
      const returnedCollection = await spotswapService.getCollection(collection.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Collection with this id", "Incorrect Response Message");
    }
  });

  test("create multiple collections", async () => {
    for (let i = 0; i < testCollections.length; i += 1) {
      testCollections[i].userId = user._id;
      // eslint-disable-next-line no-await-in-loop
      await spotswapService.createCollection(testCollections[i]);
    }
    let returnedLists = await spotswapService.getAllCollections();
    assert.equal(returnedLists.length, testCollections.length);
    await spotswapService.deleteAllCollections();
    returnedLists = await spotswapService.getAllCollections();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant collection", async () => {
    try {
      const response = await spotswapService.deleteCollection("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Collection with this id", "Incorrect Response Message");
    }
  });
});
