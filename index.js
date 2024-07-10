import { Configuration, OpenAIApi } from "openai";
import readline from "readline";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const systemMessage = {
  role: "system",
  content: "You are helpful assistant."
};

userInterface.prompt();

userInterface.on("line", async (input) => {
  await openai
    .createChatCompletion({
      model: "gpt-4",
      messages: [
        systemMessage,
        { role: "user", content: input }
      ],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      console.log(res.data.usage);
      userInterface.prompt();
    })
    .catch((error) => console.log(error));
});
