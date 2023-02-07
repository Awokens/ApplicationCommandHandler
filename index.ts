import { ExtendedClient } from "./structure/ExtendedClient";

/**
 * Instantiates an instance of the ExtendedClient.
 */
export const client = new ExtendedClient();

/**
 * Handles unhandled rejections and logs the error.
 */
process.on('unhandledRejection', (error) => {
	console.log('Unhandled Rejection Error\n', error)
});
