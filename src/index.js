import { DISCORD_TOKEN } from './consts';
import { Client, Intents, Collection } from 'discord.js';
import { readdirSync } from 'fs';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();

const cmdFiles = readdirSync(__dirname + '/commands');

cmdFiles.forEach((file) => {
	const command = require(`${__dirname}/commands/${file}`);
	client.commands.set(command.data.name, command);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	if (command) {
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);

			await interaction.reply({ content: 'Something went wrong!', ephemeral: true });
		}
	}
});

const eventFiles = readdirSync(__dirname + '/events').filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(__dirname + `/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.on('ready', () => {
	console.log('I am ready!');
	console.log(client.user.id);
});

client.login(DISCORD_TOKEN);
