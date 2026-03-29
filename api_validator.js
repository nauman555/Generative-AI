import dotenv from "dotenv";
dotenv.config();


import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    messages: [
        {
            role: "system",
            content: `You are an API response validation expert. Validate and structure API responses with error handling,
             status codes, and standardized data formats for reliable integration.`,
        },
        {
            role: "user",
            content: `Validate this API response: 
                    {\"user_id\": \"12345\", \"email\": \"invalid-email\", \"created_at\": \"2024-01-15T10:30:00Z\", 
                    \"status\": \"active\", \"profile\": {\"name\": \"John Doe\", \"age\": 25}}` },
    ],
    response_format: {
        type: "json_schema",
        json_schema: {
            name: "api_response_validation",
            schema: {
                type: "object",
                properties: {
                    validation_result: {
                        type: "object",
                        properties: {
                            is_valid: { type: "boolean" },
                            status_code: { type: "integer" },
                            error_count: { type: "integer" }
                        },
                        required: ["is_valid", "status_code", "error_count"],
                        additionalProperties: false
                    },
                    field_validations: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                field_name: { type: "string" },
                                field_type: { type: "string" },
                                is_valid: { type: "boolean" },
                                error_message: { type: "string" },
                                expected_format: { type: "string" }
                            },
                            required: ["field_name", "field_type", "is_valid", "error_message", "expected_format"],
                            additionalProperties: false
                        }
                    },
                    data_quality_score: {
                        type: "number",
                        minimum: 0,
                        maximum: 1
                    },
                    suggested_fixes: {
                        type: "array",
                        items: { type: "string" }
                    },
                    compliance_check: {
                        type: "object",
                        properties: {
                            follows_rest_standards: { type: "boolean" },
                            has_proper_error_handling: { type: "boolean" },
                            includes_metadata: { type: "boolean" }
                        },
                        required: ["follows_rest_standards", "has_proper_error_handling", "includes_metadata"],
                        additionalProperties: false
                    },
                    standardized_response: {
                        type: "object",
                        properties: {
                            success: { type: "boolean" },
                            data: { type: "object" },
                            errors: {
                                type: "array",
                                items: { type: "string" }
                            },
                            metadata: {
                                type: "object",
                                properties: {
                                    timestamp: { type: "string" },
                                    request_id: { type: "string" },
                                    version: { type: "string" }
                                },
                                required: ["timestamp", "request_id", "version"],
                                additionalProperties: false
                            }
                        },
                        required: ["success", "data", "errors", "metadata"],
                        additionalProperties: false
                    }
                },
                required: ["validation_result", "field_validations", "data_quality_score", "suggested_fixes", "compliance_check", "standardized_response"],
                additionalProperties: false
            }
        }
    }
});

const result = JSON.parse(response.choices[0].message.content || "{}");
console.log(result);