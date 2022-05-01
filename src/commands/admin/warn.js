import { SlashCommandBuilder } from '@discordjs/builders';
import { MessageEmbed } from 'discord.js';

export var data = new SlashCommandBuilder()
	.setName('warn')
	.setDescription('Warns a user.')
	.addUserOption((option) =>
		option.setName('user').setDescription('The user to warn.').setRequired(true)
	);

export async function execute(interaction, client) {
	let usrData = await client.database.fetchUser(interaction.user.id);

	if (!usrData.reputation) {
		usrData.reputation = -1;
	} else {
		usrData.reputation--;
	}

	await usrData.save();

	const user = interaction.options.getUser('user');
	const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Warn!')
		.setDescription(`User warned: ${user.username}`);
	await interaction.reply({ embeds: [embed], ephemeral: true });
}
