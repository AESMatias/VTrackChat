// require('dotenv').config();
// const OpenAI  = require('openai');
import OpenAI from "openai";
import axios from 'axios';


let openai: OpenAI;
const apiUrl = process.env.SERVER_URL || '159.223.193.255';

// if (OPENAI_API_KEY) {
//     openai = new OpenAI({
//         apiKey: OPENAI_API_KEY || "AAA",
//     });
// } else {
//     console.error("OpenAI API key is not defined.");
// }


// export const getEmbedding = async (prompt: string) => {
//     try{
//         const embedding = await openai.embeddings.create({
//         model: "text-embedding-3-small",
//         input: `${prompt}`,
//         encoding_format: "float",
//         });
        
//         return embedding;
//         }
//     catch (error){
//         console.error('Error in the getEmbedding function:', error)
//     }
// };

// export const queryOpenAIForImage = async (imageUrl: string, prompt: string) => {

//     const response = await openai.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [
//         {
//             role: "user",
//             content: [
//             { type: "text", text: `${prompt}, for any response DO NOT USE LATEX, you need to format the question for Discord. \
//                 Ensure the response is in plain text or ASCII art; avoid using LaTeX or similar formatting commands unless explicitly asked for.` },
//             {
//                 type: "image_url",
//                 image_url: {
//                 url: `${imageUrl}`,
//                 },
//             },
//             ],
//         },
//         ],
//         max_tokens: 1000,
//     });
//     console.log(response.choices[0].message.content);
//     return response.choices[0].message.content;
// };

export const queryOpenAI = async (prompt: string, messages: [], token: string) => {

  prompt = prompt.trim();
  
  const requestBody = {
    prompt: prompt,
    messages: messages || [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
    ],
  };

  // console.error('probando query con ', apiUrl, token);
  try {
    const response = await fetch(`http://${apiUrl}:3000/openai/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: 'Error in queryOpenAI function' };
  }
};