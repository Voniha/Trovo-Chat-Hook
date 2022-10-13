const fetch = require("node-fetch");

class SendWebhook {
    static async send(nickName, content, url) {
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "Trovo Chat",
                content: `**${nickName}:** - ${content}`,
            }),
        });
    }
}

module.exports = SendWebhook;