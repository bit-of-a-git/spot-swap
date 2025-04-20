import { assert } from "chai";
import { EventEmitter } from "events";
import { db } from "../../src/models/db.js";
import { testCollections, galway, derry, maggie } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

EventEmitter.setMaxListeners(25);

let testUser;

suite("Collection Model tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.collectionStore.deleteAllCollections();
    testUser = await db.userStore.addUser(maggie);
    for (let i = 0; i < testCollections.length; i += 1) {
      testCollections[i].userId = testUser._id;
      // eslint-disable-next-line no-await-in-loop
      testCollections[i] = await db.collectionStore.addCollection(testCollections[i]);
    }
  });

  test("create a collection", async () => {
    galway.userId = testUser._id;
    const collection = await db.collectionStore.addCollection(galway);
    assertSubset(galway, collection);
    assert.isDefined(collection._id);
  });

  test("delete all collections", async () => {
    let returnedCollections = await db.collectionStore.getAllCollections();
    assert.equal(returnedCollections.length, 3);
    await db.collectionStore.deleteAllCollections();
    returnedCollections = await db.collectionStore.getAllCollections();
    assert.equal(returnedCollections.length, 0);
  });

  test("get a collection - success", async () => {
    galway.userId = testUser._id;
    const collection = await db.collectionStore.addCollection(galway);
    const returnedCollection = await db.collectionStore.getCollectionById(collection._id);
    assertSubset(collection, returnedCollection);
  });

  test("delete One Collection - success", async () => {
    const id = testCollections[0]._id;
    await db.collectionStore.deleteCollectionById(id);
    const returnedCollections = await db.collectionStore.getAllCollections();
    assert.equal(returnedCollections.length, testCollections.length - 1);
    const deletedCollection = await db.collectionStore.getCollectionById(id);
    assert.isNull(deletedCollection);
  });

  test("get a collection - bad params", async () => {
    assert.isNull(await db.collectionStore.getCollectionById(""));
    assert.isNull(await db.collectionStore.getCollectionById());
  });

  test("delete One Collection - fail", async () => {
    await db.collectionStore.deleteCollectionById("bad-id");
    const allCollections = await db.collectionStore.getAllCollections();
    assert.equal(testCollections.length, allCollections.length);
  });

  test("get a user's collections - success", async () => {
    await db.collectionStore.deleteAllCollections();
    galway.userId = testUser._id;
    derry.userId = testUser._id;
    await db.collectionStore.addCollection(galway);
    await db.collectionStore.addCollection(derry);
    const returnedCollections = await db.collectionStore.getUserCollections(testUser._id);
    assert.equal(returnedCollections.length, 2);
    assertSubset(galway, returnedCollections[0]);
    assertSubset(derry, returnedCollections[1]);
  });

  test("get a user's collections - no collections", async () => {
    await db.collectionStore.deleteAllCollections();
    const returnedCollections = await db.collectionStore.getUserCollections(testUser._id);
    assert.equal(returnedCollections.length, 0);
  });

  test("get a user's collections - invalid user ID", async () => {
    const returnedCollections = await db.collectionStore.getUserCollections("invalid-id");
    assert.isNull(returnedCollections);
  });

  test("delete a user's collections - success", async () => {
    await db.collectionStore.deleteCollectionsByUserId(testUser._id);
    const returnedCollections = await db.collectionStore.getAllCollections();
    assert.equal(returnedCollections.length, 0);
  });

  test("delete a user's collections - invalid user ID", async () => {
    await db.collectionStore.deleteCollectionsByUserId("invalid-id");
    const returnedCollections = await db.collectionStore.getAllCollections();
    assert.equal(returnedCollections.length, testCollections.length);
  });

  test("update a collection - success", async () => {
    const collection = await db.collectionStore.getCollectionById(testCollections[0]._id);
    collection.title = "Mountains in the Burren";
    await db.collectionStore.updateCollection(collection);
    const updatedCollection = await db.collectionStore.getCollectionById(testCollections[0]._id);
    assert.equal(updatedCollection.title, "Mountains in the Burren");
  });
});
