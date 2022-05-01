import { NODE_ENV, CLIENT_ID, DISCORD_TOKEN as TOKEN, GUILD_ID } from './consts';
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');

// Command handling
const commands = [];

const commandFiles = fs.readdirSync(__dirname + '/commands').filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
	const command = require(__dirname + `/commands/${file}`);
	commands.push(command.data.toJSON());
});

// Publish commands
const rest = new REST({ version: '9' }).setToken(TOKEN);

if (NODE_ENV === 'production') {
    rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
        .then(() => console.log('Successfully registered global application commands.'))
        .catch(console.error);
} else {
    rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
		.then(() => console.log('Successfully registered application commands.'))
		.catch(console.error);
}
