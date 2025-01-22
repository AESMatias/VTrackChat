export interface QueryInterface {
  date: Date,       // Date and time when the query was made
  username: string,       // Username of the person who made the query
  message: string,
  embeddings?: number[],  // Optional: embedding vectors for similarity


  // summary: string,   // Summary of the query
  // context: string,        // Context in which the query was made
  // tags?: string[],        // Optional: additional tags to improve search
  // category: string,       // Category to which the query belongs
}
