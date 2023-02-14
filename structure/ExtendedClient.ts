import {
	ApplicationCommandDataResolvable,
	GatewayIntentBits,
	Collection,
	Client
} from "discord.js";

import * as dotenv from 'dotenv'
dotenv.config()

import glob from 'glob';

import { promisify } from "util";
import { ApplicationCommand } from './ApplicationCommand'
import { ApplicationCommandType } from "../typings/ApplicationCommandType";
import { ApplicationCommandRegisterOptions } from "../typings/ApplicationCommandRegisterOptions";
import { ExtendedInteraction } from "../typings/ExtendedInteraction";

/**
 * Promisified version of the glob module.
 */
export const globPromise = promisify(glob);

/**
 * Class for an extended Discord.js client.
 */
export class ExtendedClient extends Client {

	/**
	 * Collection of registered application commands.
	 */
	commands: Collection<string, ApplicationCommandType> = new Collection();

	/**
	 * Constructs an instance of ExtendedClient with the specified intent options.
	 */
	constructor() {
		super({
			intents: [
				GatewayIntentBits.GuildMembers,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.Guilds,
			]
		})
		this.initialize();
	}

	/**
	 * Initializes the client by calling `registerModules` and logging into Discord using the bot token from an environment variable.
	 */
	async initialize() {
		this.registerModules();
		this.login(process.env['botToken'] as string);
	}

	/**
	 * Imports the default export of a module at the given file path.
	 * 
	 * @param path - The file path of the module to be imported.
	 * @returns The default export of the imported module.
	 */
	async importFile(path: string) {
		return (await import(path))?.default;
	}

	async registerApplicationCommands({ guildId, commands }: ApplicationCommandRegisterOptions) {
		/**
		 * Registers a list of ApplicationCommandDataResolvable objects as commands in the specified guild.
		 * @param guildId - The ID of the guild to register the commands in.
		 * @param commands - The list of ApplicationCommandDataResolvable objects to register.
		 */
		this.guilds.cache.get(guildId)?.commands.set(commands)
	}



	async registerModules() {
		/**
		 * Registers all commands found in the `src/commands` directory.
		 * Searches for `.ts` and `.js` files and loads them as modules.
		 */
		const commandsFolderFiles = await globPromise(
			`${__dirname}/../commands/**/*{.ts,.js}`
		);

		const applicationCommands: ApplicationCommandDataResolvable[] = [];

		for (const path of commandsFolderFiles) {
			const command: ApplicationCommandType = await this.importFile(path);

			if (!(command instanceof ApplicationCommand)) continue;

			/**
			 * Adds the loaded command module to the commands Collection for future reference.
			 */
			this.commands.set(command.name, command);
			console.debug(command.name);

			applicationCommands.push(command);
		}

		this.once('ready', () => {
			/**
			 * Registers all of the application commands once the client is ready.
			 */
			this.registerApplicationCommands({
				commands: applicationCommands,
				guildId: process.env['guildId'] as string
			});

			console.log('Discord Bot is ready ✓');
		});

		this.on('interactionCreate', async (interaction) => {

			if (!interaction.isChatInputCommand()) return;

			const command = this.commands.get(interaction?.commandName);

			if (!(command instanceof ApplicationCommand)) {
				interaction.reply({
					content: 'This command has no functionality',
					ephemeral: true
				});
				return;
			}

			await command.run({
				interaction: interaction as ExtendedInteraction
			}).catch(console.error);

		});
	}


}
