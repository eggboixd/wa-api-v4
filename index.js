const express = require('express');
const config = require('./src/config');
const { connectToWhatsApp } = require('./src/whatsapp');
const apiRouter = require('./src/api');

const app = express();

app.use(express.json()); // For parsing application/json

// Webhook test endpoint (to demonstrate webhook receiving)
app.post('/webhook-test', (req, res) => {
    console.log('Webhook received:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.use('/api', apiRouter);

app.listen(config.port, async () => {
    console.log(`Server running on port ${config.port}`);
    await connectToWhatsApp();
});
