import { MessageEmbed } from 'discord.js';

export const name = 'guildMemberAdd';
export const once = false;

export async function execute(member) {
	const embed = new MessageEmbed().setColor('#0099ff').setTitle('Welcome to the server!').setDescription('Please read the rules and have fun!');

	member.guild.channels.cache.find((i) => i.name == 'general').send({ embeds: [embed] });
}
