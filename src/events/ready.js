import { NODE_ENV } from "../consts";

export const name = 'ready';
export const once = true;

export function execute(client) {
	console.info(`Logged in as ${client.user.tag}!`);
    console.info(`Invite link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);
    client.user.setPresence({ activities: [{ name: 'In development...', type: 'WATCHING' }], status: 'online' });
}
