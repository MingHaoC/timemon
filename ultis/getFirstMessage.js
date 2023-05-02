var moment = require('moment-timezone');
require("dotenv").config();
const { EmbedBuilder } = require('discord.js');

module.exports  = async function test(client, channelId) {
  let guild = await client.guilds.fetch(process.env.GUILDID);
  let channel = await guild.channels.fetch(channelId);
  let messages = await channel.messages.fetch({ limit: 1 })
  
  return messages.values();
}