const { quote } = require('discord.js');
const moment = require('moment-timezone');

module.exports = function(timezone) { 
  return quote(`${moment(new Date()).tz(timezone).format('h:mm a')}`);
}