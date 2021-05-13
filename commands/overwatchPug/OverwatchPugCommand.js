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
      name: "pugmaker",
      description: "Helps design pug teams.",
    },
  });
};

const runPugMaker = async (clientIn, sender, channelId, guildId, interaction) => {
  currentPugs[guildId] = defaultPug;
  clientIn.api.interactions(interaction.id, interaction.token).callback.post({
    data: {
      type: 4,
      data: {
        embeds: [
          {
            title: "PUG Maker 9000",
            description: "This command will help the host of a PUG design the teams, captains and notifications of a PUG.",
            color: 5897984,
            author: {
              name: "Lorm",
              url: "https://discordapp.com",
              icon_url: "https://cdn.discordapp.com/app-icons/840773916750118953/fa3dfc87e42d7fda7929a06ddb3b7a6e.png",
            },
            fields: [
              {
                name: ":one:",
                value: "Set a PUG start time in UTC. Use **/setpugtime {time-in-UTC}** to set the time.",
              },
              {
                name: ":two:",
                value: "Anyone with the PUGs or Ringer role will then be DM'd and asked to join, these players will then be able to see a scheduling channel if they can't make it.",
              },
              {
                name: ":three:",
                value: "Once enough players have registered and the time comes all invitees will be notified. The host can edit the teams with **/editpugteams**",
              },
              {
                name: ":alarm_clock:",
                value: "Change the start time with **/changepugtime {new-time}**",
                inline: true,
              },
              {
                name: ":stop_button:",
                value: "Cancel the pug with **/cancelpug**",
                inline: true,
              },
            ],
          },
        ],
      },
    },
  });
};

module.exports = { overwatchPugs: { initCommands, runPugMaker } };
