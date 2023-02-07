import { ApplicationCommand } from "../structure/ApplicationCommand";

export default new ApplicationCommand({
    name: 'ping',
    description: 'Ping pong!',
    run: async ({ interaction }) => {
        interaction.reply({
            content: `Pong! ${interaction.user}`,
            ephemeral: true
        });
    }
});