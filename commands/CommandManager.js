const TestPongComamnd = require("./testing/TestPongComamnd");
const DiscordJS = require("discord.js");

let client;
const guildId = "840773742560018443";

const getApp = (guildId, clientIn) => {
  const app = clientIn.api.applications(clientIn.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
};

// Exports
const initClient = (clientIn) => {
  client = clientIn;
};

const initCommands = async (clientIn) => {
  await TestPongComamnd.testPong.initCommand(guildId, clientIn);
};

const listenForCommands = (clientIn, discordJS) => {
  clientIn.ws.on("INTERACTION_CREATE", async (interaction) => {
    const guildId = interaction.guild_id;
    const sender = new discordJS.GuildMember(clientIn, interaction.member, interaction.guild_id);
    const command = interaction.data.name;
    const channelId = interaction.channel_id;

    switch (command) {
      case "testlorm":
        TestPongComamnd.testPong.runCommand(clientIn, sender, channelId, guildId, interaction);
        break;
      default:
        clientIn.api.interactions(interaction.id, interaction.token).callback.post({
          data: {
            type: 4,
            data: {
              content: "Unknown Command!",
            },
          },
        });
    }
  });
};

const clearOldCommandsThenInit = async (clientIn) => {
  const oldCommands = await getApp(guildId, clientIn).commands.get();

  await oldCommands.forEach(async (command) => {
    if (command.application_id === "840773916750118953") {
      await getApp(guildId, clientIn).commands(command.id).delete();
    }
  });

  initCommands(clientIn);
};

module.exports = { initClient, initCommands, listenForCommands, clearOldCommandsThenInit };
