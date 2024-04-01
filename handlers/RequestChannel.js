const { PermissionFlagsBits } = require("discord.js");
const JUGNU = require("./Client");

/**
 *
 * @param {JUGNU} client
 */
module.exports = async (client) => {
  // request channel
  try {
    client.on("messageCreate", async (message) => {
      if (!message.guild || !message.id) return;
      let data = await client.music.get(`${message.guild.id}.music`);
      if (!data) return;
      let musicchannel = message.guild.channels.cache.get(data.channel);
      if (!musicchannel) return;
      if (message.channelId === musicchannel.id) {
        // code
        if (message.author.bot) {
          if (message.id != data.qmsg || message.id != data.pmsg) {
            setTimeout(() => {
              message.delete().catch((e) => {});
            }, 3000);
          }
        } else {
          let song = message.cleanContent;
          if (message.id != data.qmsg || message.id != data.pmsg) {
            setTimeout(() => {
              message.delete().catch((e) => {});
            }, 1000);
          }
          let voiceChannel = message.member.voice.channel;

          if (
            !message.guild.members.me.permissions.has(
              PermissionFlagsBits.Connect
            )
          ) {
            return client.embed(
              message,
              `** ${client.config.emoji.ERROR} I don't Have Permission to Join Voice Channel **`
            );
          } else if (!voiceChannel) {
            return client.embed(
              message,
              `** ${client.config.emoji.ERROR} You Need to Join Voice Channel **`
            );
          } else if (
            message.guild.members.me.voice.channel &&
            !message.guild.members.me.voice.channel.equals(voiceChannel)
          ) {
            return client.embed(
              message,
              `** ${client.config.emoji.ERROR} You Need to Join __MY__ Voice Channel **`
            );
          } else {
            client.distube.play(voiceChannel, song, {
              member: message.member,
              message: message,
              textChannel: message.channel,
            });
          }
        }
      }
    });
  } catch (e) {}
};
