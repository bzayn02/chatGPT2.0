// 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

import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const configuration = new Configuration({
  organization: 'org-utetifdFqL0rckCIfgWsuKU5',
  apiKey: process.env.api_Key,
});
const openai = new OpenAIApi(configuration);

// create a simple express api that call the above function

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const port = 8000;

app.post('/', async (req, res) => {
  try {
    const { message, currentModel } = req.body;
    console.log('message', message);

    const response = await openai.createCompletion({
      model: `${currentModel}`,
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });

    res.json({ message: response.data.choices[0].text });
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/models', async (req, res) => {
  try {
    const response = await openai.listEngines();
    console.log(response.data.data);
    res.json({
      models: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} `);
});
