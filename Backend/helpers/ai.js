require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateStrategy = async (goal, audience, budget) => {
  const messages = [
    { role: "system", content: "You are a marketing strategist." },
    { role: "user", content: `Generate a marketing strategy for the goal: "${goal}", target audience: "${audience}", and budget: ${budget}. Provide actionable steps.` },
  ];

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4", // Or "gpt-3.5-turbo" for a faster and cheaper option
      messages,
      max_tokens: 200,
    });

    if (!response || !response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error("No valid response from OpenAI API.");
    }

    return response.data.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error calling OpenAI API:", err.response ? err.response.data : err.message);
    throw new Error("AI generation failed.");
  }
};

module.exports = { generateStrategy };
