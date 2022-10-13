const WebSocket = require("ws");
const chalk = require("chalk");
const Token = require("./getToken");
const discordHook = require("./sendWebhook");

class Websocket {
    static async readChat(channelId, clientId, webhookURL) {
        let tokenx = await Token.getToken(channelId, clientId);
        const ws = new WebSocket('wss://open-chat.trovo.live/chat');
        return new Promise(async (resolve, reject) => {
            const timer = setInterval(async () => {
                if (ws.readyState === 1) {
                    let token = tokenx
                    let data = {
                        type: "AUTH",
                        nonce: "test",
                        data: {
                            token: token
                        }
                    }
                    ws.send(JSON.stringify(data));
                    clearInterval(timer)
                    resolve(ws);
                }
            }, 5000);
            setInterval(() => {
                let ping = {
                    type: "PING",
                    nonce: "stayAlive"
                }
                ws.send(JSON.stringify(ping));
            }, 30000);
            ws.addEventListener("message", async (event) => {
                if (event.data == '{"type":"PONG","nonce":"stayAlive","data":{"gap":30}}') return;
                if (event.data == '{"type":"RESPONSE","nonce":"test"}') return;
                let cht = JSON.parse(event.data);
                if (webhookURL) await discordHook.send(cht.data.chats[0].nick_name, cht.data.chats[0].content, webhookURL);
                 console.log(
                    chalk.white("[") +
                    chalk.blueBright("CHAT") +
                    chalk.white("]") +
                    " " +
                    chalk.white(cht.data.chats[0].nick_name + " - " + cht.data.chats[0].content)
                );
            });
        });
    }
}

module.exports = Websocket;