import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testSpots, galway, derry, derryGirls } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Spot Model tests", () => {
  let galwayList = null;

  setup(async () => {
    db.init("mongo");
    await db.collectionStore.deleteAllCollections();
    await db.spotStore.deleteAllSpots();
    galwayList = await db.collectionStore.addCollection(galway);
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSpots[i] = await db.spotStore.addSpot(galwayList._id, testSpots[i]);
    }
  });

  test("create single spot", async () => {
    const derryList = await db.collectionStore.addCollection(derry);
    const spot = await db.spotStore.addSpot(derryList._id, derryGirls);
    assert.isNotNull(spot._id);
    assertSubset(derryGirls, spot);
  });

  test("get multiple spots", async () => {
    const spots = await db.spotStore.getSpotsByCollectionId(galwayList._id);
    assert.equal(spots.length, testSpots.length);
  });

  test("delete all spots", async () => {
    const spots = await db.spotStore.getAllSpots();
    assert.equal(testSpots.length, spots.length);
    await db.spotStore.deleteAllSpots();
    const newSpots = await db.spotStore.getAllSpots();
    assert.equal(0, newSpots.length);
  });

  test("get a spot - success", async () => {
    const derryList = await db.collectionStore.addCollection(derry);
    const spot = await db.spotStore.addSpot(derryList._id, derryGirls);
    const newSpot = await db.spotStore.getSpotById(spot._id);
    assertSubset(derryGirls, newSpot);
  });

  test("delete One Spot - success", async () => {
    await db.spotStore.deleteSpot(testSpots[0]._id);
    const spots = await db.spotStore.getAllSpots();
    assert.equal(spots.length, testSpots.length - 1);
    const deletedSpot = await db.spotStore.getSpotById(testSpots[0]._id);
    assert.isNull(deletedSpot);
  });

  test("get a spot - bad params", async () => {
    assert.isNull(await db.spotStore.getSpotById(""));
    assert.isNull(await db.spotStore.getSpotById());
  });

  test("delete one spot - fail", async () => {
    await db.spotStore.deleteSpot("bad-id");
    const spots = await db.spotStore.getAllSpots();
    assert.equal(spots.length, testSpots.length);
  });
});
