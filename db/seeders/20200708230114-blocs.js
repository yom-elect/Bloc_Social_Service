/* eslint-disable linebreak-style */
/* eslint-disable quotes */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "BLOCS",
      [
        {
          id: 1,
          blocName: "global news",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280766/Blocs%20Images/global_news_hst9eg.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 2,
          blocName: "architecture",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280764/Blocs%20Images/architecture_x3jmtw.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 3,
          blocName: "fashion",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280766/Blocs%20Images/fashion_fqjzb4.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 4,
          blocName: "health",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280766/Blocs%20Images/health_cyeifn.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 5,
          blocName: "art",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280764/Blocs%20Images/art_dhgdx3.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 6,
          blocName: "technology",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280768/Blocs%20Images/technology_piyvan.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 7,
          blocName: "entrepreneurship",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/entrepreneurship_x6x8dz.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 8,
          blocName: "music",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/music_bvuykx.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 9,
          blocName: "gaming",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280766/Blocs%20Images/gaming_jottfk.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 10,
          blocName: "photography",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/photography_uzvm7x.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 11,
          blocName: "soccer",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280768/Blocs%20Images/soccer_r7elde.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 12,
          blocName: "culture",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/culture_viuzvh.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 13,
          blocName: "basketball",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280764/Blocs%20Images/basketball_xn2klz.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 14,
          blocName: "discover places",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/discover_places_s4f6iw.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 15,
          blocName: "american football",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280764/Blocs%20Images/american_football_uwau7l.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 16,
          blocName: "religion",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280768/Blocs%20Images/religion_pgutq5.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 17,
          blocName: "beauty",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280764/Blocs%20Images/beauty_eywx6j.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 18,
          blocName: "tv/movies",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280768/Blocs%20Images/tv_movies_wde3on.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 19,
          blocName: "history",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280766/Blocs%20Images/history_lrcaag.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 20,
          blocName: "education",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/education_lr31cd.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },

        {
          id: 21,
          blocName: "comedy",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/comedy_ulfg5o.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 22,
          blocName: "programming",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/programming_fba8i3.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },

        {
          id: 23,
          blocName: "autos",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/autos_zyckqs.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 24,
          blocName: "relationship",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/relationship_b9odnr.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 25,
          blocName: "nature",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/nature_q5moo7.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 26,
          blocName: "creativity",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/creativity_pmqses.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 27,
          blocName: "mental health",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280766/Blocs%20Images/mental_health_pgjgvb.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 28,
          blocName: "red room",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/redroom_djak0j.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 29,
          blocName: "other sports",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/other_sports_vreznm.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 30,
          blocName: "animals",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280764/Blocs%20Images/animals_gdo1ft.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 31,
          blocName: "books",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/books_nbvbwd.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 32,
          blocName: "quotes",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/quotes_ghyrw0.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 33,
          blocName: "cricket",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/cricket_ckguib.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 34,
          blocName: "sex education",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280768/Blocs%20Images/sex_education_euhv5o.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 35,
          blocName: "fitness",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280766/Blocs%20Images/fitness_ovwbpc.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 36,
          blocName: "party",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/party_rsec2m.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 37,
          blocName: "missing people",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280767/Blocs%20Images/missing_people_fzhtxe.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 38,
          blocName: "advertisement",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280765/Blocs%20Images/advertisement.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
        {
          id: 39,
          blocName: "food/drinks",
          blocImage:
            "https://res.cloudinary.com/bloc/image/upload/v1594280766/Blocs%20Images/food_drinks_ue5wxc.jpg",
          createdAt: "2020-08-06 10:23:54+02",
          updatedAt: "2020-08-06 10:23:54+02",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("BLOCS", null, {});
  },
};
