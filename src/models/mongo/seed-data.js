export const seedData = {
  users: {
    _model: "User",
    admin: {
      firstName: "David",
      lastName: "O' Connor",
      email: "admin@spotswap.com",
      password: "adminsecretpassword",
      role: "admin",
    },
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      role: "user",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      role: "user",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      role: "user",
    },
  },
  collections: {
    _model: "Collection",
    sligo: {
      title: "Best views in Sligo",
      userId: "->users.bart",
      county: "Sligo",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633135/4f66592b13e349c6b7c897b067312ea1_vbsyqq.jpg",
    },
    cong: {
      title: "Quiet Man spots in Cong",
      userId: "->users.marge",
      county: "Mayo",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633166/header-cong-county-mayo_rzb7l5.jpg",
    },
    belfast: {
      title: "Titanic locations in Belfast",
      userId: "->users.homer",
      county: "Antrim",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633215/146164-Belfast-City-Hall_l23spr.jpg",
    },
    galway: {
      title: "Underrated places in Galway",
      userId: "->users.bart",
      county: "Galway",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633248/2Fmethode_2Ftimes_2Fprod_2Fweb_2Fbin_2F6e73edc4-3f15-11e8-b6d1-2c479ec10e4b_emv3nx.jpg",
    },
    cork: {
      title: "Best pubs in Cork",
      userId: "->users.marge",
      county: "Cork",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633302/Cork-City-scaled_h2atxe.jpg",
    },
  },
  categories: {
    _model: "Category",
    food: {
      name: "Food & Drink",
    },
    nature: {
      name: "Nature & Outdoors",
    },
    history: {
      name: "Historical Sites",
    },
    culture: {
      name: "Art & Culture",
    },
    nightlife: {
      name: "Nightlife & Entertainment",
    },
    shopping: {
      name: "Shopping",
    },
    adventure: {
      name: "Adventure & Sports",
    },
    relaxation: {
      name: "Relaxation & Wellness",
    },
    unusual: {
      name: "Unusual Experiences",
    },
  },
  spots: {
    _model: "Spot",
    spot_1: {
      name: "Queen Maeve Trail",
      description:
        "Spectacular views in all directions, including the Ox Mountains, Lough Gill, and Slieve League in Donegal. On a clear day, Croagh Patrick can be seen in the west.",
      latitude: 54.25326,
      longitude: -8.55774,
      collectionId: "->collections.sligo",
      categoryId: "->categories.nature",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633365/header-queen-maeve-county-sligo_xjhfou.jpg",
    },
    spot_2: {
      name: "Quiet Man Statue",
      description: "A bronze statue of John Wayne and Maureen O'Hara.",
      latitude: 53.540515,
      longitude: -9.286646,
      collectionId: "->collections.cong",
      categoryId: "->categories.culture",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633432/IMG_7364-001_cac4dp.jpg",
    },
    spot_3: {
      name: "Titanic Belfast",
      description: "A visitor attraction and monument to Belfast's maritime heritage on the site of the former Harland & Wolff shipyard in the city's Titanic Quarter.",
      latitude: 54.60815,
      longitude: -5.909918,
      collectionId: "->collections.belfast",
      categoryId: "->categories.history",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633469/Titanic_Belfast_HDR_fwpssc.jpg",
    },
    spot_4: {
      name: "Connemara National Park",
      description: "A national park in County Galway, western Ireland.",
      latitude: 53.5486,
      longitude: -9.8852,
      collectionId: "->collections.galway",
      categoryId: "->categories.nature",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633488/Connemara12Bens_cn1cii.jpg",
    },
    spot_5: {
      name: "Pizza Point",
      description: "Great pizza, sold by the slice",
      latitude: 53.272776,
      longitude: -9.049986,
      collectionId: "->collections.galway",
      categoryId: "->categories.nature",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633831/pizza-point-1200x741-1_wqagys.jpg",
    },
    spot_6: {
      name: "Circle of Life Commemorative Garden",
      description: "A beautiful stone garden beside the sea in Salthill",
      latitude: 53.25815,
      longitude: -9.086178,
      collectionId: "->collections.galway",
      categoryId: "->categories.nature",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742634055/CityParkCircleOfLife2-scaled_qf47z5.jpg",
    },
    spot_7: {
      name: "Coughlan's",
      description: "A traditional Irish pub in Cork, featuring live music.",
      latitude: 51.898,
      longitude: -8.472,
      collectionId: "->collections.cork",
      categoryId: "->categories.nightlife",
      img: "https://res.cloudinary.com/dkfxkuklv/image/upload/v1742633542/function-room-cork-coughlans-2_csrx9n.jpg",
    },
  },
};
