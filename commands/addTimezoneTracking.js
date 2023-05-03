const { SlashCommandBuilder, bold, PermissionFlagsBits } = require('discord.js');
require("dotenv").config();
const getFirstMessage = require('../ultis/getFirstMessage');
const getTimeInfo = require('../ultis/getTimeInfo');
const { EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtimezone')
		.setDescription('Will add a timezone to track to the list of chat')
    .setDefaultMemberPermissions(PermissionFlagsBits.administrator)
    .addStringOption(option =>
			option.setName('timezone')
				.setDescription('time zone you want to track')
				.setRequired(true)
        .addChoices(
          { name: "Australia/Melbourne", value: "Australia/Melbourne" },
          { name: "Australia/Sydney", value: "Australia/Sydney" },
          { name: "America/Toronto", value: "America/Toronto" },
          { name: "America/Winnipeg", value: "America/Winnipeg" },
          { name: "America/Resolute", value: "America/Resolute" },
          { name: "America/Edmonton", value: "America/Edmonton" },
          { name: "America/Vancouver", value: "America/Vancouver" },
          { name: "America/New_York" ,value: "America/New_York" },
          { name: "America/Detroit" ,value: "America/Detroit" },
          { name: "America/Chicago" ,value: "America/Chicago" },
          { name: "America/Denver" ,value: "America/Denver" },
          { name: "America/Boise" ,value: "America/Boise" },
          { name: "America/Phoenix" ,value: "America/Phoenix" },
          { name: "America/Los_Angeles" ,value: "America/Los_Angeles" },
          { name: "Asia/Tokyo", value: "Asia/Tokyo" },
          { name: "Asia/Seoul", value: "Asia/Seoul" },
          { name: "Europe/Berlin", value: "Europe/Berlin" },
          { name: "Europe/Paris", value: "Europe/Paris" },
          { name: "Europe/London", value: "Europe/London" }
        )),
	async execute(interaction, client) {
    let channelId = process.env.CHANNELID;
    let timezone = interaction.options.getString('timezone', true).toLowerCase();
    let messages = await getFirstMessage(client, channelId);
    if(messages.length > 1) {
      interaction.reply("Please make sure the channel doesn't contain any message (not including this message from this bot)");
      return;
    }

    let [message] = messages;
    if(message && message.embeds[0].data.fields.find(e => e.name.replaceAll('*', '').toLowerCase() === timezone)) {
      interaction.reply(`Already tracking ${timezone}`);
      return;
    }

    let embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle('Time')
      .setDescription('tracking time in different timezone');
    let guild = await client.guilds.fetch(process.env.GUILDID);
    let channel = await guild.channels.fetch(channelId);
    let value = getTimeInfo(timezone);;

    if (message && message.embeds.length == 1) {
      embed.setFields(message.embeds[0].data.fields);
      embed.setFields(...embed.data.fields, { name: bold(timezone), value });
    } else 
      embed.setFields({ name: bold(timezone), value });

    if (message && message.embeds.length == 1)
      message.edit({ embeds: [embed] });
    else 
      channel.send({ embeds: [embed] });
    await interaction.reply(`Now tracking ${timezone}, name: ${timezone}`);
	},
};