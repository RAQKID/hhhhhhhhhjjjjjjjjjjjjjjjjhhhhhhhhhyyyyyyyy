const express = require("express");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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",
  defaultHeaders: {
    "HTTP-Referer": "",
    "X-Title": "",
  },
});

// Helper function to call any model
async function askModel(model, prompt) {
  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: prompt }],
  });

  return completion.choices[0].message.content.trim();
}

// ========== ROUTES ========== //

// /nemotron
app.get("/nemotron", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) {
      return res.status(400).send(
        JSON.stringify(
          { status: false, result: [{ response: "Missing 'prompt' query parameter." }] },
          null,
          2
        )
      );
    }

    const reply = await askModel("nvidia/nemotron-nano-9b-v2:free", prompt);

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({ status: true, result: [{ response: reply }] }, null, 2)
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(
      JSON.stringify(
        { status: false, result: [{ response: "Something went wrong." }] },
        null,
        2
      )
    );
  }
});

// /deepseek
app.get("/deepseek", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) {
      return res.status(400).send(
        JSON.stringify(
          { status: false, result: [{ response: "Missing 'prompt' query parameter." }] },
          null,
          2
        )
      );
    }

    const reply = await askModel("deepseek/deepseek-chat-v3.1:free", prompt);

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({ status: true, result: [{ response: reply }] }, null, 2)
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(
      JSON.stringify(
        { status: false, result: [{ response: "Something went wrong." }] },
        null,
        2
      )
    );
  }
});

// /gemma
app.get("/gemma", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) {
      return res.status(400).send(
        JSON.stringify(
          { status: false, result: [{ response: "Missing 'prompt' query parameter." }] },
          null,
          2
        )
      );
    }

    const reply = await askModel("google/gemma-3-27b-it:free", prompt);

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({ status: true, result: [{ response: reply }] }, null, 2)
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(
      JSON.stringify(
        { status: false, result: [{ response: "Something went wrong." }] },
        null,
        2
      )
    );
  }
});

// /qwen
app.get("/qwen", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) {
      return res.status(400).send(
        JSON.stringify(
          { status: false, result: [{ response: "Missing 'prompt' query parameter." }] },
          null,
          2
        )
      );
    }

    const reply = await askModel("qwen/qwen3-235b-a22b:free", prompt);

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({ status: true, result: [{ response: reply }] }, null, 2)
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(
      JSON.stringify(
        { status: false, result: [{ response: "Something went wrong." }] },
        null,
        2
      )
    );
  }
});

// /glm
app.get("/glm", async (req, res) => {
  try {
    const prompt = req.query.prompt;
    if (!prompt) {
      return res.status(400).send(
        JSON.stringify(
          { status: false, result: [{ response: "Missing 'prompt' query parameter." }] },
          null,
          2
        )
      );
    }

    const reply = await askModel("z-ai/glm-4.5-air:free", prompt);

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSON.stringify({ status: true, result: [{ response: reply }] }, null, 2)
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(
      JSON.stringify(
        { status: false, result: [{ response: "Something went wrong." }] },
        null,
        2
      )
    );
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("The server is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
