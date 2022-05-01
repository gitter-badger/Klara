import { DISCORD_TOKEN, MONGO_URI } from './consts';
import fs, { readdirSync } from 'fs';
import util from 'util';
import { Client, Intents, Collection } from 'discord.js';
const readdir = util.promisify(fs.readdir);
import { connect } from 'mongoose';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new Collection();
client.event = new Collection();
client.database = require('./db/mongoose');

async function init() {
	const cmdFolders = await readdir(__dirname + '/commands');
	
	cmdFolders.forEach(folder => {
		const cmdFiles = readdirSync(__dirname + `/commands/${folder}/`).filter((file) => file.endsWith('.js'));
		for (const file of cmdFiles) {
			const cmd = require(`./commands/${folder}/${file}`);
			client.commands.set(cmd.data.name, cmd);
		}
	});

	client.on('interactionCreate', async (interaction) => {
		if (!interaction.isCommand) return;

		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		if (command) {
			try {
				await command.execute(interaction, client);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'Something went wrong!', ephemeral: true });
			}
		}
	});

	const eventFiles = fs.readdirSync(__dirname + '/events').filter((file) => file.endsWith('.js'));

	for (const file of eventFiles) {
		const event = require(__dirname + `/events/${file}`);
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
		} else {
			client.on(event.name, (...args) => event.execute(...args));
		}
	}

	connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			console.info('Connected to MongoDB');
		})
		.catch((err) => {
			console.error('Unable to connect to MongoDB Database.\nError: ' + err);
		});

	await client.login(DISCORD_TOKEN);
}

init();
