// require('dotenv').config();
// const OpenAI  = require('openai');
import Constants from 'expo-constants';

import { OPENAI_API_KEY } from '@env';

import OpenAI from "openai";


export const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});


export const getEmbedding = async (prompt: string) => {

    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: `${prompt}`,
      encoding_format: "float",
    });
    
    return embedding;
  };

export const queryOpenAIForImage = async (imageUrl: string, prompt: string) => {

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
        {
            role: "user",
            content: [
            { type: "text", text: `${prompt}, for any response DO NOT USE LATEX, you need to format the question for Discord. \
                Ensure the response is in plain text or ASCII art; avoid using LaTeX or similar formatting commands unless explicitly asked for.` },
            {
                type: "image_url",
                image_url: {
                url: `${imageUrl}`,
                },
            },
            ],
        },
        ],
        max_tokens: 1000,
    });
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
};

export const queryOpenAI = async (prompt: string, messages) => {

    // const embeddingResponse = await getEmbedding(prompt);
    // console.log('embedding', embeddingResponse.data[0].embedding);
    
    messages = []; // TODO: SOLVE THIS!
    const apiKey = process.env.OPENAI_API_KEY;
    const modelName = "gpt-4o-mini";
    const client = new OpenAI({apiKey});
    let response = '';

        if (!messages) {
            console.log(' NO MENSAJHES')
            messages = [
                {
                    role: "user",
                    content: `${prompt}`
                }
            ]
        }

        else{
            //If the user is premium, then the last four messages are saved so he can have a better context
            const lastFourMessages = [];
            //If the messages are more than 4, then the last four messages are saved
            if (messages.length > 4){
                messages = messages.slice(messages.length-4, messages.length);
            }

            for (let i=0; i<messages.length; i++){

                const actualQuery = messages[i].query;
                const actualResponse = messages[i].response;

                lastFourMessages.push({
                    role: "user",
                    content: `${actualQuery}`
                });

                lastFourMessages.push({
                    role: "assistant",
                    content: `${actualResponse}`
                });
            }

            messages = [
                {
                    role: "user",
                    content: `${prompt}`
                },
                ...lastFourMessages
            ]

        }
    
            response = await client.chat.completions.create({
            messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant, but with the personality of\
                        a philosopher. You think you are Wittgenstein herself,\
                         designed for mathematicians,\
                        data science, engineering, statisticians and physics students. You do not talk\
                        more than necessary unless the user ask you to do it. Also, whatever the user ask, you do \
                        without hesitation, you serve like an assistant. This bot is Discord response only, so adjust\
                        the responses to order if is just text; code representation if it is code; latex\
                        or wolfram mathematica, etc. Do you speak in Spanish unless the user spoke in English aswell."
                    },
                    ...messages
            ],
            model: modelName,
            max_tokens: 2000
        });
        // console.log('LOS MSJ SONNNN', messages)
        return response.choices[0].message.content;
    }