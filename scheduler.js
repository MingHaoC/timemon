require("dotenv").config();
const { EmbedBuilder } = require('discord.js');
const getMessage = require('./ultis/getFirstMessage');
const getTimeInfo = require('./ultis/getTimeInfo');

module.exports  = async function scheduler(client) {

  console.log("testing");

  let exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Time')
    .setDescription('tracking time in different timezone');

  let channelId = '1102893862718021702';
  let [message] = await getMessage(client, channelId);
  if(!message) {
    return;
  }
  let fields = message.embeds[0].data.fields;

  console.log(fields);
  for(let field of fields) {
    let value = getTimeInfo(field.name.replaceAll('*', ''));
    exampleEmbed.addFields({ name: field.name, value: value });
  }

  message.edit({ embeds: [exampleEmbed] });
}