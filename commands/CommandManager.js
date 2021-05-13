const TestPongCommand = require("./testing/TestPongCommand");
const OverwatchPugCommand = require("./overwatchPug/OverwatchPugCommand");
const DiscordJS = require("discord.js");
const fs = require("fs");

let client;
const localCommands = ["testlorm", "pugmaker"];
let botGuilds = [];

const getAppGuild = (guildId, clientIn) => {
  const app = clientIn.api.applications(clientIn.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
};

// Exports
const initClient = (clientIn) => {
  client = clientIn;
  botGuilds = clientIn.guilds.cache.map((guild) => guild.id);
};

const setupCommands = async (clientIn, guildId) => {
  await TestPongCommand.testPong.initCommands(guildId, clientIn);
  await OverwatchPugCommand.overwatchPugs.initCommands(guildId, clientIn);
};

const initCommands = async (clientIn) => {
  await botGuilds.forEach(async (guildId) => {
    const oldCommandsGuild = await getAppGuild(guildId, clientIn).commands.get();

    console.log(oldCommandsGuild);

    await oldCommandsGuild.forEach(async (commandGuild) => {
      if (commandGuild.application_id === "840773916750118953" && !localCommands.includes(commandGuild.name)) {
        await getAppGuild(guildId, clientIn).commands(commandGuild.id).delete();
      }
    });

    await setupCommands(clientIn, guildId);
  });
};

const initNewGuild = async (guildId, clientIn) => {
  const oldCommandsGuild = await getAppGuild(guildId, clientIn).commands.get();

  await oldCommandsGuild.forEach(async (commandGuild) => {
    if (commandGuild.application_id === "840773916750118953" && !localCommands.includes(commandGuild.name)) {
      await getAppGuild(guildId, clientIn).commands(commandGuild.id).delete();
    }
  });

  botGuilds.push(guildId);

  await setupCommands(clientIn, guildId);
};

const removeGuild = async (guildId) => {
  const index = botGuilds.indexOf(guildId);
  if (index > -1) {
    botGuilds.splice(index, 1);
  }
};

const listenForCommands = (clientIn, discordJS) => {
  clientIn.ws.on("INTERACTION_CREATE", async (interaction) => {
    const guildId = interaction.guild_id;
    const sender = new discordJS.GuildMember(clientIn, interaction.member, interaction.guild_id);
    const command = interaction.data.name;
    const channelId = interaction.channel_id;

    switch (command) {
      case "testlorm":
        await TestPongCommand.testPong.runTest(clientIn, sender, channelId, guildId, interaction);
        break;
      case "pugmaker":
        await OverwatchPugCommand.overwatchPugs.runPugMaker(clientIn, sender, channelId, guildId, interaction);
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

module.exports = { initClient, initCommands, listenForCommands, initNewGuild, removeGuild };
