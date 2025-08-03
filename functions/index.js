const functions = require('firebase-functions');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: functions.config().openai.key });

exports.parseRecipe = functions.https.onRequest(async (req, res) => {
  const { text } = req.body;

  const prompt = `
You are a helpful assistant that extracts structured recipe data from messy text. Given this text, return a JSON object with:
- title (string),
- ingredients (string[]),
- instructions (string[])

Text:
${text}

JSON:`.trim();

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    });

    const responseText = completion.choices[0].message.content;
    const recipe = JSON.parse(responseText);
    res.json(recipe);
  } catch (err) {
    console.error('AI Parse Error:', err);
    res.status(500).json({ error: 'Failed to parse via AI' });
  }
});
