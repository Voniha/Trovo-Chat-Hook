const fs = require("fs");

class SaveData {
    static saveClientID(clientId) {
        let data = fs.readFileSync("./src/config.json");
        let parsed = JSON.parse(data);
        parsed.clientId = clientId;
        return fs.writeFileSync("./src/config.json", JSON.stringify(parsed, null, 3));
    }
    static saveChannelId(channelId) {
        let data = fs.readFileSync("./src/config.json");
        let parsed = JSON.parse(data);
        parsed.channelId = channelId;
        return fs.writeFileSync("./src/config.json", JSON.stringify(parsed, null, 3));
    }
    static saveWebhookURL(webhookUrl) {
        let data = fs.readFileSync("./src/config.json");
        let parsed = JSON.parse(data);
        parsed.webhookURL = webhookUrl;
        return fs.writeFileSync("./src/config.json", JSON.stringify(parsed, null, 3));
    }
}

module.exports = SaveData;