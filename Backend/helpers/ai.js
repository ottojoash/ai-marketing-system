require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateStrategy = async (goal, audience, budget) => {
  const prompt = `Generate a marketing strategy for the goal: "${goal}", target audience: "${audience}", and budget: ${budget}. Provide actionable steps.`;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 200,
    });

    return response.data.choices[0].text.trim();
  } catch (err) {
    console.error("Error calling OpenAI API:", err.message);
    throw new Error("AI generation failed.");
  }
};

module.exports = { generateStrategy };
