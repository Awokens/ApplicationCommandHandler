import { ChatInputCommandInteraction, GuildMember } from "discord.js";

/* Extending the ChatInputCommandInteraction interface with a new property called member. */
export interface ExtendedInteraction extends ChatInputCommandInteraction {
	member: GuildMember;
}