import 'dotenv/config';
import { Client, Intents } from 'discord.js';

const { DISCORD_TOKEN } = process.env;

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log('I am ready!');
    console.log(client.user.id);
});

client.login(DISCORD_TOKEN);