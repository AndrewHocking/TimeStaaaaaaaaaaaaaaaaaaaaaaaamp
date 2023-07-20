const { SlashCommandBuilder } = require('discord.js');
const chrono = require('chrono-node');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timestamp')
        .setDescription('Generates a timestamp. If no date or time are provided it will default to the current date and time.')
        .addStringOption(option =>
            option
                .setName('when')
                .setDescription('When the timestamp is for. If no timezone is provided, it will default to Eastern Time.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const when = interaction.options.getString('when').toUpperCase() ?? "Now";
        const date = chrono.parseDate(when);
        const unixTimeStamp = Math.floor(date.getTime() / 1000);
        var resultString = "";
        const suffixes = ["d", "D", "t", "T", "f", "F", "R"];
        for (let i in suffixes) {
            resultString += "`<t:" + unixTimeStamp.toString() + ":" + suffixes[i] + ">`  ➔  <t:" + unixTimeStamp.toString() + ":" + suffixes[i] + ">\n";
        }

        // const output = date.toString();
        await interaction.reply({ content: resultString, ephemeral: true });
    },
};