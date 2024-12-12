const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files are temporarily stored in the "uploads" folder

// VirusTotal API configuration
const VIRUSTOTAL_API_URL = 'https://www.virustotal.com/api/v3/files';
const API_KEY = process.env.VIRUSTOTAL_API_KEY;

app.post('/receive-text', async (req, res) => {
    const { text } = req.body;

    const apiKey = "7ea9ee8988a77e2b1f683c2b082bd7a9a8acd4368612cebfe68734d42cfb469b"; // Replace with your VirusTotal API key
    const apiUrl = "https://www.virustotal.com/api/v3/urls";
    // const testUrl = req.query.url || "http://example.com"; // Accept the URL as a query parameter
    const formatedUrl = text.replace(/^https?:\/\//, "").replace(/^https?:\/\//, "").replace('www.', "")
    const encodedUrl = Buffer.from(formatedUrl).toString("base64"); // Encode to Base64

    try {
        const response = await fetch(`${apiUrl}/${encodedUrl}`, {
            method: "GET",
            headers: {
                "x-apikey": apiKey,
            },
        });

        const result = await response.json();

        if (result?.data?.attributes?.last_analysis_stats?.malicious > 0)
            res.json('Url Not Safe or Malicious');
        else
            res.json('Url Safe');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


// Route to upload file and scan with VirusTotal
app.post('/receive-file', upload.single('file'), async (req, res) => {
    try {
        console.log('abc')
        // Ensure file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = req.file.path;

        console.log("filePath", filePath)
        console.log("API_KEY", API_KEY)
        // Read the uploaded file
        const fileBuffer = fs.readFileSync(filePath);

        // Send file to VirusTotal
        const response = await axios.post(VIRUSTOTAL_API_URL, fileBuffer, {
            headers: {
                'x-apikey': API_KEY,
                'Content-Type': 'application/octet-stream',
            },
        });

        // Clean up uploaded file from the server
        fs.unlinkSync(filePath);

        // Return the response from VirusTotal to the client
        return res.status(200).json({
            message: 'File successfully scanned',
            data: response.data,
        });
    } catch (error) {
        console.error('Error uploading or scanning the file:', error.message);

        // Return an error response
        return res.status(500).json({
            error: 'Error scanning the file',
            details: error.message,
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
