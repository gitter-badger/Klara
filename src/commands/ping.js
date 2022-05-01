import { SlashCommandBuilder } from '@discordjs/builders';

export var data = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!');

export async function execute(interaction) {
	await interaction.reply({ content: 'Pong!', ephemeral: true });
}
