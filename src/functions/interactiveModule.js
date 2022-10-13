const readline = require("readline");
const Websocket = require("./websocket");
const token = require("./getToken");
const db = require("./saveData");
const { readFileSync } = require("fs");

class interactiveModule {
    static ask() {
        let rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.on("close", () => rl.write("Bye, thanks for using my script!"));
        rl.write("Welcome to the Trovo Chat client by Voniha#2302");
        rl.write("\n");
        rl.on("line", async (line) => {
            switch (line) {
                case "q": {
                    rl.write("\n");
                    rl.close();
                    break;
                }
                case "quit": {
                    rl.write("\n");
                    rl.close();
                    break;
                }
                case "help": {
                    rl.write(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n~ setup - Runs the installer.\n~ start - Starts the program\n~ help - Shows all available functions.\n~ q/quit - Quits the program.\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
                    rl.write("\n")
                    break;
                }
                case "start": {
                    const config = readFileSync("./src/config.json");
                    let conf = JSON.parse(config);
                    if (!conf.channelId || !conf.clientId) {
                        rl.write("Please setup your data first. (something is missing)"); 
                        rl.write("\n");
                    } else {
                        rl.write("The program is running, please do not close this window.");
                        rl.write("\n");
                        await Websocket.readChat(conf.channelId, conf.clientId, conf.webhookURL);
                    }
                    break;
                }
                case "setup": {
                    rl.question("Please write / paste your client ID: ", (answer) => {
                        if (answer) {
                            rl.question("Please write / paste your Trovo channel ID: ", (answer1) => {
                                if (answer1) {
                                    rl.question("Please write / paste your Discord Webhook: ", async (answer2) => {
                                        db.saveClientID(answer);
                                        db.saveChannelId(answer1);
                                        if (answer2) db.saveWebhookURL(answer2);
                                        rl.write("\n");
                                        rl.write("Setup successful, the program is running, please do not close this window.");
                                        rl.write("\n");
                                        const config = readFileSync("./src/config.json");
                                        let conf = JSON.parse(config);
                                        await Websocket.readChat(conf.channelId, conf.clientId, conf.webhookURL);
                                    });
                                }
                            });
                        }
                    });
                    break;
                }
            }
        });
    }
}


module.exports = interactiveModule;