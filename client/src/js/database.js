import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction("jate", "readwrite");
  // Open up the desired object store.
  const store = tx.objectStore("jate");
  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: 1, jate: content });
  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");
  try {
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    const result = await request;
    console.log(result[0]);
    return result[0].jate;
  } catch (err) {
    console.log(err);
  }
};

initdb();
