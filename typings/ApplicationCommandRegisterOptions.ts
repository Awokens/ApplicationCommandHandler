import { ApplicationCommandDataResolvable } from "discord.js";

/**
 * Options for registering application commands.
 */
export interface ApplicationCommandRegisterOptions {
	guildId: string;
	commands: ApplicationCommandDataResolvable[];
}