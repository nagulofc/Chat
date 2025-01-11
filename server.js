const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

// Initialize server
const app = express();
app.use(cors());
app.use(bodyParser.json());

// OpenAI API setup
const configuration = new Configuration({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
});
const openai = new OpenAIApi(configuration);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `You are a helpful and friendly human-like assistant. Reply to: "${userMessage}"`,
      max_tokens: 150,
    });

    const botReply = completion.data.choices[0].text.trim();
    res.json({ reply: botReply });
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    res.status(500).json({ reply: 'Sorry, I encountered an error.' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
