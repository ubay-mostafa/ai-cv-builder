const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateCV({ name, job, skills }) {
  const prompt = `
You are a professional HR recruiter.
Write a concise, professional CV summary.

Name: ${name}
Target Job: ${job}
Skills: ${skills}

Write in clear, professional English.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert CV writer." },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { generateCV };
