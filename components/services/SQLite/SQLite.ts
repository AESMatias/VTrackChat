import * as SQLite from 'expo-sqlite';
import { QueryInterface } from '@/components/services/SQLite/types';
import { getEmbedding } from '@/components/services/openAIQueries';
import * as numeric from 'numeric';
// import cosineSimilarity from 'compute-cosine-similarity'; //TODO: Delete this dependency!


export const initDatabase = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('myDatabase.db');


    const returned = await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    INSERT INTO test (value, intValue) VALUES ('test1', 123);
    INSERT INTO test (value, intValue) VALUES ('test2', 456);
    INSERT INTO test (value, intValue) VALUES ('test3', 789);
    `);

    console.log('Database sucessfully CREATED', returned);

    // id: number;             // Unique identifier (AUTOINCREMENT in the database)
    // queryText: string;      // Text of the query
    // date: Date;             // Date and time when the query was made
    // category: string;       // Category to which the query belongs
    // username: string;       // Username of the person who made the query
    // summary: string;        // Summary of the query
    // context: string;        // Context in which the query was made
    // embeddings?: number[];  // Optional: embedding vectors for similarity
    // tags?: string[];        // Optional: additional tags to improve search
    const returned2 = await db.execAsync(`
    PRAGMA journal_mode = WAL;
    
    CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    queryText TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    embedding TEXT NOT NULL);  -- Store embeddings as binary data

    CREATE INDEX IF NOT EXISTS idx_category ON queries (category);

      `);
  
      console.log('Database sucessfully CREATED2', returned2);
  


    // `getAllAsync()` is useful when you want to get all results as an array of objects.
    const allRows = await db.getAllAsync('SELECT * FROM test');
    for (const row of allRows) {
      // console.log(row.id, row.value, row.intValue);
    }

  } catch (error) {
    console.error('Error opening database:', error);
  }
};


const cosineSimilarity = (vecA, vecB) => {


  if (!vecA || !vecB) {
    console.error('One or both of the vectors are undefined:');
    return -1;
  }
  // From SQLite, the second vector is a string, so we need to convert it to an array
  vecB = JSON.parse(vecB); // Convert to array (object)


  // console.log(typeof vecA, typeof vecB)

    // Validate that both vectors are arrays
    if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
      console.error('vecA or vecB is not an array:');
      console.log('vecA is array? ', Array.isArray(vecA), 'Type:', typeof vecA);
      console.log('vecB is array? ', Array.isArray(vecB), 'Type:', typeof vecB);
      return -1;
    }

  // console.log('vector 2 empieza con estos 20 caraceteres>', vecB.slice(0, 20))

  try{
    const dotProduct = numeric.dot(vecA, vecB);
    const normA = numeric.norm2(vecA);
    // console.log('normA:', normA)
    // console.log('normB:', numeric.norm2(vecB))
    const normB = numeric.norm2(vecB);

    // If they are the same, return -1 because we don't want to consider the same query
    if (normA === normB) return -1;

    return dotProduct / (normA * normB);
  }
  catch(e){
    console.log('Error in the cosine similarity:', e)
    //Retornamos un valor muy bajo para que no se considere
    return -1
  }
};



export const insertQuery = async (QueryObject: QueryInterface) => {
  try {
    const db = await SQLite.openDatabaseAsync('myDatabase.db');

    // Get the current date and time TODO: Move to a global utility function
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const timeString = currentDate.toTimeString().split(' ')[0]; // HH:MM:SS
    // Combine date and time into a single string if needed
    const dateTimeString = `${dateString} ${timeString}`; // For combined date and time


    const queryEmbedding = QueryObject?.embeddings?.data[0]?.embedding || [-1];
    const queryCategory = QueryObject.category || 'general';
    const querySummary = QueryObject.summary || 'No summary provided';
    const queryText = QueryObject.queryText || 'No query text provided';

    // `runAsync()` is useful when you want to execute some write operations.
    const result = await db.runAsync('INSERT INTO queries (queryText, date, category, embedding) VALUES (?, ?, ?, ?)',
      [queryText, dateTimeString, queryCategory, queryEmbedding]);
    
  // console.log(result.lastInsertRowId, result.changes);
  // console.log('ESTOY METIENDO UNA QUERY:', queryEmbedding)

    // `getAllAsync()` is useful when you want to get all results as an array of objects.
    // const allRows = await db.getAllAsync('SELECT * FROM queries');
    // for (const row of allRows) {
    //   // console.log(row.id, '_id :', row.queryText);
    //   const propertyNames = Object.keys(row); 
    //   console.log("Properties of this row:", propertyNames);
    // }

    let mostSimilarText = null;
    let highestSimilarity = -1;
    
    const allRows = await db.getAllAsync('SELECT embedding, queryText FROM queries');

    for (const row of allRows) {
        // console.log('REVISANDOO', Object.keys(row))

        const similarity = cosineSimilarity(queryEmbedding, row.embedding);
        // const similarity = cosineSimilarity([0,3,4], [0,1,1]);
        if (similarity > highestSimilarity) {
            highestSimilarity = similarity;
            mostSimilarText = row.queryText;
        }
    }
    console.log('Most similar query:', mostSimilarText, 'with similarity:', highestSimilarity);
    db.closeAsync();

  } catch (error) {
    console.error('Error inserting Query:', error);
  }
};


function getQueriesByCategory(category: string, callback: (queries: any[]) => void) {
  db.transaction(tx => {
      tx.executeSql(
          'SELECT * FROM queries WHERE category = ?',
          [category],
          (_, result) => {
              const queries = result.rows._array; // Get the rows as an array
              callback(queries);
          },
          (tx, error) => { console.error('Error fetching queries:', error); }
      );
  });
}




// Function to retrieve and rank queries based on similarity
async function getMostSimilarQueries(prompt: string, category: string, topN = 5) {
  // Step 1: Get embedding for the user query
  const userEmbedding = await getEmbedding(prompt);
  if (!userEmbedding) {
    console.error('Could not get user embedding.');
    return;
  }

  const db = SQLite.openDatabase('myDatabase.db'); // Open the database

  // Step 2: Fetch all relevant queries and their embeddings
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM queries WHERE category = ?',
      [category],
      async (_, result) => {
        const queries = result.rows._array; // Get the rows as an array
        
        // Step 3: Calculate similarity for each query
        const similarities = queries.map(query => {
          const storedEmbedding = new Float32Array(query.embedding); // Convert BLOB to Float32Array
          const similarity = cosineSimilarity(userEmbedding, storedEmbedding);
          return { ...query, similarity };
        });

        // Step 4: Sort and get the top N similar queries
        similarities.sort((a, b) => b.similarity - a.similarity); // Sort by similarity in descending order
        const topQueries = similarities.slice(0, topN); // Get top N queries

        console.log('Most similar queries:', topQueries);
      },
      (tx, error) => { console.error('Error fetching queries:', error); }
    );
  });
}