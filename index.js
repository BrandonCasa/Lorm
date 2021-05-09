const DiscordJS = require("discord.js");
require("dotenv").config();

const guildId = "840773742560018443";
const client = new DiscordJS.Client();

const getApp = (guildId) => {
  const app = client.api.applications(client.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
};

client.on("ready", async () => {
  console.log("The bot is ready.");

  const commands = await getApp(guildId).commands.get();

  console.log(commands);

  await getApp(guildId).commands.post({
    data: {
      name: "ping",
      description: "A simple ping pong command",
    },
  });
});

client.login(process.env.TOKEN);
