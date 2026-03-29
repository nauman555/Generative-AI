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
            content: "You are cyber crime expert from NCCIA Pakistan, Who helps the cyber victims ",
        },
        {
            role: "user",
            content: "who are you",
        },
    ],
});

console.log(groq_response.choices[0].message.content);



