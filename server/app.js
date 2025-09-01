const express = require("express");
const fetch = require("node-fetch"); 
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;
    console.log(phone, message, "<--- data came");
    try {
        const response = await fetch("https://textbelt.com/text", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phone,
                message,
                key: "textbelt",
            }),
        });
        const data = await response.json();
        console.log(data, "<--- textbelt response");
        res.json(data);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(8080, () =>
    console.log("✅ Server running on http://localhost:8080")
);
