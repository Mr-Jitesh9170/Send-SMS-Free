const express = require("express");
const app = express();
const cors = require("cors")
const axios = require("axios")
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/send-sms", async (req, res) => {
    const { phone, message } = req.body;
    if (!phone || !message) {
        return res.status(400).json({ message: "Missing field!" });
    }
    try {
        const response = await axios.post("https://textbelt.com/text", {
            phone,
            message,
            key: "textbelt",
        });
        res.status(200).json({ success: true, data: response.data });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});
const port = process.env.PORT || 3000
app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
); 