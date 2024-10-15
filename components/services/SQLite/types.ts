export interface QueryInterface {
  // id: number;             // Unique identifier (AUTOINCREMENT in the database)
  queryText: string;      // Text of the query
  date: Date;             // Date and time when the query was made
  category: string;       // Category to which the query belongs
  username: string;       // Username of the person who made the query
  summary: string;        // Summary of the query
  context: string;        // Context in which the query was made
  embeddings?: number[];  // Optional: embedding vectors for similarity
  tags?: string[];        // Optional: additional tags to improve search
}
