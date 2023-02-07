import { ChatInputApplicationCommandData, Client, CommandInteractionOptionResolver } from "discord.js";
import { ExtendedInteraction } from "./ExtendedInteraction";

/**
 * Options for running a command.
 */
interface RunOptions {
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