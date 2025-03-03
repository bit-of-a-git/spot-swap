export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
    },
  },
  collections: {
    _model: "Collection",
    sligo: {
      title: "Best views in Sligo",
      userId: "->users.bart",
    },
    cong: {
      title: "Quiet Man spots in Cong",
      userId: "->users.marge",
    },
    belfast: {
      title: "Titanic locations in Belfast",
      userId: "->users.homer",
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
    },
    spot_2: {
      name: "Quiet Man Statue",
      description: "A bronze statue of John Wayne and Maureen O'Hara.",
      latitude: 53.540515,
      longitude: -9.286646,
      collectionId: "->collections.cong",
    },
    spot_3: {
      name: "Titanic Belfast",
      description: "A visitor attraction and monument to Belfast's maritime heritage on the site of the former Harland & Wolff shipyard in the city's Titanic Quarter.",
      latitude: 54.60815,
      longitude: -5.909918,
      collectionId: "->collections.belfast",
    },
  },
};
