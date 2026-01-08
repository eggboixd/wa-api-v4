require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    webhookUrl: process.env.WEBHOOK_URL,
    sessionPath: process.env.SESSION_PATH || './auth_info_baileys'
};
