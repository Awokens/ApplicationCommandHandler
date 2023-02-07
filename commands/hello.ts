import { ApplicationCommand } from "../structure/ApplicationCommand";

export default new ApplicationCommand({
    name: "hello",
    description: "Hello World!",
    run: async ({ interaction }) => {
        interaction.reply({
            content: 'Hello World!'
        });
    }
});