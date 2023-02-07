import { ApplicationCommandType } from "../typings/ApplicationCommandType";

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