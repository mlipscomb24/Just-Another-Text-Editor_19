import { openDB } from "idb";

const initdb = async () => {
  try {
    const db = await openDB("jate", 1, {
      upgrade(db) {
        if (db.objectStoreNames.contains("jate")) {
          console.log("jate database already exists");
          return;
        }
        db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
        console.log("jate database created");
      },
    });
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

// Method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    console.log("PUT to the database");
    const jateDb = await initdb();
    const tx = jateDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log("🚀 - data saved to the database", result);
  } catch (error) {
    console.error("putDb not implemented", error);
  }
};

// Method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("GET from the database");
    const jateDb = await initdb();
    const tx = jateDb.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.get(1);
    const result = await request;
    console.log("result.value", result);
    return result?.value;
  } catch (error) {
    console.error("getDb not implemented", error);
  }
};

// Initialize the database
initdb();
