import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { spotswapService } from "./spotswap-service.js";
import { maggie, galway, testCollections, testSpots, crane } from "../fixtures.js";

suite("Spot API tests", () => {
  let user = null;
  let galwayList = null;

  setup(async () => {
    await spotswapService.deleteAllCollections();
    await spotswapService.deleteAllUsers();
    await spotswapService.deleteAllSpots();
    user = await spotswapService.createUser(maggie);
    galway.userid = user._id;
    galwayList = await spotswapService.createCollection(galway);
  });

  teardown(async () => {});

  test("create spot", async () => {
    const returnedSpot = await spotswapService.createSpot(galwayList._id, crane);
    assertSubset(crane, returnedSpot);
  });

  test("create Multiple spots", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await spotswapService.createSpot(galwayList._id, testSpots[i]);
    }
    const returnedSpots = await spotswapService.getAllSpots();
    assert.equal(returnedSpots.length, testSpots.length);
    for (let i = 0; i < returnedSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const spot = await spotswapService.getSpot(returnedSpots[i]._id);
      assertSubset(spot, returnedSpots[i]);
    }
  });

  test("Delete SpotApi", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await spotswapService.createSpot(galwayList._id, testSpots[i]);
    }
    let returnedSpots = await spotswapService.getAllSpots();
    assert.equal(returnedSpots.length, testSpots.length);
    for (let i = 0; i < returnedSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const spot = await spotswapService.deleteSpot(returnedSpots[i]._id);
    }
    returnedSpots = await spotswapService.getAllSpots();
    assert.equal(returnedSpots.length, 0);
  });

  test("denormalised collection", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await spotswapService.createSpot(galwayList._id, testSpots[i]);
    }
    const returnedCollection = await spotswapService.getCollection(galwayList._id);
    assert.equal(returnedCollection.spots.length, testSpots.length);
    for (let i = 0; i < testSpots.length; i += 1) {
      assertSubset(testSpots[i], returnedCollection.spots[i]);
    }
  });
});
