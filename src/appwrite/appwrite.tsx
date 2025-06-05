import { databases } from "./config";

import { ID, Query } from "appwrite";

// const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const updateSearchCount = async (searchTerm, movie) => {
  //1. use APPwrite sdk to check if the search term exists in the database

  // console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);

  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    //2.if it does, update the count
    if (result.documents.length > 0) {
      const doc = result.document[0];

      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });

      //3. if it doesn't, create a new document with the search term and count as 1
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.log(error);
  }

  //   try {
  //     const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
  //       Query.equal("searchTerm", searchTerm),
  //     ]);
  // //2.if it does, update the count
  //     if (result.documents.length > 0) {
  //       const doc = result.documents[0];
  //       await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
  //         count: doc.count + 1,
  //       });
  //         //3. if it doesn't, create a new document with the search term and count as I
  //     } else {
  //         await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
  //             searchTerm,
  //             count: 1,
  //             movie_id: movie_id,
  //             poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_url}`,
  //        })
  //     }
  //   } catch (error) {
  //       console.log(error)
  //   }
};

export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      (Query.limit(5), Query.orderDesc("count")),
    ]);

    return result.documents;
  } catch (error) {
    console.log(error);
  }
};

// export const getTrendingMovies = async () => {
//   try {
//     const result = await databases.listDocuments(DATABASE_ID,COLLECTION_ID,[{Query.limit(5),Query.orderDesc('count')}])
//   } catch (error) {
//     console.log(error)
//   }
// }
