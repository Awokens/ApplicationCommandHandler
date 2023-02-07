import {
	ApplicationCommandDataResolvable,
	GatewayIntentBits,
	Collection,
	Client,
	ChatInputApplicationCommandData,
	ChatInputCommandInteraction,
	CommandInteractionOptionResolver,
	GuildMember,
} from "discord.js";

import glob from 'glob';

import { promisify } from "util";

/**
 * Handles unhandled rejections and logs the error.
 */
process.on('unhandledRejection', (error) => {
	console.log('Unhandled Rejection Error\n', error)
});

/**
 * Promisified version of the glob module.
 */
export const globPromise = promisify(glob);

/**
 * Options for registering application commands.
 */
export interface ApplicationCommandRegisterOptions {
	guildId: string;
	commands: ApplicationCommandDataResolvable[];
}

/**
 * Extended interaction with the member who made the interaction.
 */
export interface ExtendedInteraction extends ChatInputCommandInteraction {
	member: GuildMember;
}

/**
 * Options for running a command.
 */
interface RunOptions {
	client: ExtendedClient;
	interaction: ExtendedInteraction;
	options: CommandInteractionOptionResolver;
}

/**
 * The function type for running a command.
 */
type RunFunction = (options: RunOptions) => Promise<any>;

/**
 * Type definition for an application command.
 */
export type ApplicationCommandType = {
	run: RunFunction;
} & ChatInputApplicationCommandData;

/**
 * Class for an application command.
 */
export class ApplicationCommand {
	/**
	 * Constructs an instance of ApplicationCommand with the given options.
	 * 
	 * @param commandOptions - The options for the application command.
	 */
	constructor(commandOptions: ApplicationCommandType) {
		Object.assign(this, commandOptions);
	}
}

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
				GatewayIntentBits.Guilds
			]
		})
	}

	/**
	 * Initializes the client by calling `registerModules` and logging into Discord using the bot token from an environment variable.
	 */
	async initialize() {
		this.registerModules();
		this.login(process.env['botToken']);

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
			`${__dirname}/src/commands/**/*{.ts,.js}`
		);

		let applicationCommands: ApplicationCommandDataResolvable[] = [];

		commandsFolderFiles.forEach(async (path) => {
			const command: ApplicationCommandType = await this.importFile(path);

			if (!(command instanceof ApplicationCommand)) return;

			/**
			 * Adds the loaded command module to the commands Collection for future reference.
			 */
			this.commands.set(command.name, command);

			applicationCommands.push(command);

		});

		this.once('ready', () => {
			/**
			 * Registers all of the application commands once the client is ready.
			 */
			this.registerApplicationCommands({
				commands: applicationCommands,
				guildId: process.env['guildId'] as string
			});

			console.log('Discord Bot is ready ✓');
		})
	}
}

/**
 * Instantiates an instance of the ExtendedClient.
 */
export const client = new ExtendedClient();

/**
 * This is an example of application command (/hello)
 * src/commands/hello.ts
 */
export default new ApplicationCommand({
	name: 'hello',
	description: 'Says hello back.',
	run: async ({ interaction }) => {
		interaction.reply({
			content: `Hello there, ${interaction.user}`
		});
	}
});

