import dotenv from "dotenv";
import { tavily } from "@tavily/core";
import readline from "node:readline/promises";

dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function main() {

    // create an interface for taking input from the user
    const userInput = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const messagesArray = [
        {
            role: "system",
            // here we instruct the LLM to use the tool if it has no latest information
            // and if it has latest information it will not use the tool
            content: `You are smart personal Assitant who answers the asked question 
                        You have access the following tools:
                        1. tool_calling(query): {query: string} // Search the latest information and realtime data 
                        // on internet`,
        },

    ];

    // take input from the user

    while (true) {

        // take input from the user using readline
        const question = await userInput.question("You: ");

        // exit the loop if the user input is exit, quit or bye
        if (question === "exit" || question === "quit" || question === "bye") {
            break;
        }

        // push the user input into messagesArray for further processing
        messagesArray.push({ role: "user", content: question });


        // run the code in loop until the tool calls are not present a
        while (true) {
            const groq_response = await groq.chat.completions.create({
                model: "llama-3.3-70b-versatile",
                temperature: 0,

                messages: messagesArray,
                // used this object for tool calling , if LLM has no latest information it will call this tool 
                // to get the latest information from the internet
                "tools": [
                    {
                        "type": "function",
                        "function": {
                            "name": "tool_calling",
                            "description": "Search the latest information and realtime data on internet",
                            "parameters": {
                                // JSON Schema object
                                "type": "object",
                                "properties": {
                                    "query": {
                                        "type": "string",
                                        "description": "The search query to perform search on"
                                    },

                                },

                            }
                        }
                    }
                ],
                tool_choice: "auto",
            });

            // push the groq response into messagesArray for further processing 
            messagesArray.push(groq_response.choices[0].message);

            // check if tool calls are present
            const toolCalls = groq_response.choices[0].message.tool_calls;

            // if tool calls are not present, print the AI assitant response and exit
            if (!toolCalls) {
                console.log("Response : ", groq_response.choices[0].message.content);
                break;
            }

            // if tool calls are present, get the function name and arguments from tool calls
            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                // get the arguments from tool calls in json format 
                const functionArgs = JSON.parse(toolCall.function.arguments);

                // call the tool and print the result
                if (functionName === "tool_calling") {
                    const toolCallResult = await tool_calling(functionArgs);

                    // push the tool call result as a object  into messagesArray for further processing
                    messagesArray.push({
                        role: "tool",
                        name: functionName,
                        content: toolCallResult,
                        tool_call_id: toolCall.id,
                    });

                }

            }
        }

    }

    // close the interface
    userInput.close();

}

main();

const tool_calling = async ({ query }) => {
    console.log("Searching on Web...");
    const tvly = tavily({ apiKey: process.env.TVLY_API_KEY });

    // receive multiple results from the tool call
    const response = await tvly.search(query);
    // combining all the results from the tool call in a single string 
    const finalResponse = response.results.map((result) => result.content).join("\n\n");
    return finalResponse;
}



