import { ChatInputCommandInteraction, GuildMember } from "discord.js";

/**
 * Extended interaction with the member who made the interaction.
 */
export interface ExtendedInteraction extends ChatInputCommandInteraction {
	member: GuildMember;
}