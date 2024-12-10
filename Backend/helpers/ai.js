require("dotenv").config();
const { OpenAIApi } = require("openai");

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateStrategy = async (goal, audience, budget) => {
  const prompt = `Generate a marketing strategy for the goal: "${goal}", target audience: "${audience}", and budget: ${budget}. Provide actionable steps.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a marketing strategist." },
        { role: "user", content: prompt },
      ],
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("Error calling OpenAI API:", err.message);
    throw new Error("AI generation failed.");
  }
};

module.exports = { generateStrategy };
