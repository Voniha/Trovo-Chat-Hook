const fetch = require("node-fetch");
const WebSocket = require("ws");

async function connectToServer() {
    const ws = new WebSocket('wss://open-chat.trovo.live/chat');
    return new Promise(async (resolve, reject) => {
        const timer = setInterval(async () => {
            if (ws.readyState === 1) {
                let token = await getChatToken();
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
            ws.send(JSON.stringify(ping))
        }, 30000);
        ws.addEventListener("message", (event) => {
            if (event.data == '{"type":"PONG","nonce":"stayAlive","data":{"gap":30}}') return;
            if (event.data == '{"type":"RESPONSE","nonce":"test"}') return;
            let cht = JSON.parse(event.data);
            fetch("${your_webhook_url}", { // your webhook link.
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "Trovo Chat",
                    content: `**${cht.data.chats[0].nick_name}** - ${cht.data.chats[0].content}`,
                }),
            });
        });
    });
}

connectToServer()
async function getChatToken() {                                       // id of the channel you want to receive messages.
    let res = await fetch("https://open-api.trovo.live/openplatform/chat/channel-token/{channel_id}", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Client-ID": "${api_client_id}", // developer.trovo.live
        }
    });
    let data = await res.json();
    return data.token;
}
