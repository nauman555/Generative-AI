import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const groq_response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,

    messages: [
        {
            role: "system",
            content: "You are smart personal Assitant who answers the asked question smartly and politely",
        },
        {
            role: "user",
            content: "when was iphone 16 launched",
        },
    ],
});

console.log(groq_response.choices[0].message.content);



