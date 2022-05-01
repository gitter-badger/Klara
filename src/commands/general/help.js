import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export var data = new SlashCommandBuilder().setName('help').setDescription('Sends a help message.');

export async function execute(interaction) {
	const embed = new MessageEmbed().setColor('#0099ff').setTitle('Help').setDescription('This is a help message. All commands are slash commands.').addFields({
		name: 'ping',
		value: 'Replies with Pong!',
		inline: true,
	});
	await interaction.reply({ embeds: [embed], ephemeral: true });
}
