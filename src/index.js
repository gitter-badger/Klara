import 'dotenv/config';
import { Client, Intents, Collection } from 'discord.js';
import { readdirSync } from 'fs';

const { DISCORD_TOKEN } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

const cmdFiles = readdirSync(__dirname + '/commands');

cmdFiles.forEach((file) => {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand) return;

	const { command, args } = interaction;
	const cmd = client.commands.get(command);

	if (cmd) {
		try {
			await cmd.excecute(interaction);
		} catch (error) {
            console.error(error);
            
            await interaction.reply({content: 'Something went wrong!', ephemeral: true});
		}
	}
});

client.on('ready', () => {
	console.log('I am ready!');
	console.log(client.user.id);
});

client.login(DISCORD_TOKEN);
