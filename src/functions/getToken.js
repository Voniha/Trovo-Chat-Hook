const fetch = require("node-fetch");

class GetToken {
    static async getToken(channelId, clientId) {
        let res = await fetch(`https://open-api.trovo.live/openplatform/chat/channel-token/${channelId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Client-ID": clientId,
            }
        });
        let data = await res.json();
        return data.token;
    }
}

module.exports = GetToken;