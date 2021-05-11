let currentPugs = {};

const defaultPug = {
  teams: [
    {
      players: [
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
      ],
    },
    {
      players: [
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
        {
          battleTag: "",
          rank: "",
        },
      ],
    },
  ],
};

const getApp = (guildId, clientIn) => {
  const app = clientIn.api.applications(clientIn.user.id);
  if (guildId) {
    app.guilds(guildId);
  }
  return app;
};

const initCommands = async (guildId, clientIn) => {
  await getApp(guildId, clientIn).commands.post({
    data: {
      name: "startpug",
      description: "Starts a pick up game match of Overwatch.",
    },
  });
  await getApp(guildId, clientIn).commands.post({
    data: {
      name: "endpug",
      description: "Ends the current pickup game match of Overwatch.",
    },
  });
};

const runStartPug = async (clientIn, sender, channelId, guildId, interaction) => {
  currentPugs[guildId] = defaultPug;
  clientIn.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: "Starting pickup game!",
      },
    },
  });
};

const runEndPug = async (clientIn, sender, channelId, guildId, interaction) => {
  clientIn.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        content: "Ending pickup game!",
      },
    },
  });
};

module.exports = { overwatchPugs: { initCommands, runStartPug, runEndPug } };
