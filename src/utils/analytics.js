import { db } from "../models/db.js";

// https://github.com/ki321g/Rugby-Club-POI/blob/main/src/utils/analytics-utils.js

async function getUserWithMostSpots(totalUsers) {
  let maxUser = null;
  let maxSpotsCount = 0;

  for (const user of totalUsers) {
    let spotsCount = 0;
    const userCollections = await db.collectionStore.getUserCollections(user._id);

    for (const collection of userCollections) {
      const spots = await db.spotStore.getSpotsByCollectionId(collection._id);
      spotsCount += spots.length;
    }

    if (spotsCount > maxSpotsCount) {
      maxSpotsCount = spotsCount;
      maxUser = user;
    }
  }
  return { user: maxUser, spotsCount: maxSpotsCount };
}

async function getCollectionWithMostSpots(totalCollections) {
  let maxCollection = null;
  let maxSpotsCount = 0;

  for (const collection of totalCollections) {
    const spots = await db.spotStore.getSpotsByCollectionId(collection._id);
    const spotsCount = spots.length;
    if (spotsCount > maxSpotsCount) {
      maxSpotsCount = spotsCount;
      maxCollection = collection;
    }
  }
  return { collection: maxCollection, spotsCount: maxSpotsCount };
}

function formatNumber(number) {
  return number % 1 === 0 ? number : number.toFixed(2);
}

export async function analytics() {
  try {
    const totalUsers = await db.userStore.getAllUsers();
    const totalCollections = await db.collectionStore.getAllCollections();
    const totalSpots = await db.spotStore.getAllSpots();

    const totalUsersNum = totalUsers.length;
    const totalCollectionsNum = totalCollections.length;
    const totalSpotsNum = totalSpots.length;

    const userWithMostSpots = await getUserWithMostSpots(totalUsers);
    const collectionWithMostSpots = await getCollectionWithMostSpots(totalCollections);
    const averageSpotsPerCollection = formatNumber(totalSpotsNum / totalCollectionsNum);

    return {
      totalUsersNum,
      totalCollectionsNum,
      totalSpotsNum,
      userWithMostSpots,
      collectionWithMostSpots,
      averageSpotsPerCollection,
    };
  } catch (error) {
    console.error("Error in Analytics", error);
    return null;
  }
}
