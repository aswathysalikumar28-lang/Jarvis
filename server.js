import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

    const { message, apiKey } = req.body;

    try {

        const response = await fetch(
            "https://api.anthropic.com/v1/messages",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": apiKey,
                    "anthropic-version": "2023-06-01"
                },
                body: JSON.stringify({
                    model: "claude-3-5-sonnet-20241022",
                    max_tokens: 300,
                    messages: [
                        {
                            role: "user",
                            content: message
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        res.json({
            reply: data.content[0].text
        });

    } catch (error) {

        res.json({
            reply: "Error talking to Claude"
        });

    }

});

app.listen(3000, () => {
    console.log("Jarvis running on port 3000");
});