import { ApplicationCommand } from "../structure/ApplicationCommand";

export default new ApplicationCommand({
    name: "brrr",
    description: "*car noises*",
    run: async ({ interaction }) => {
        interaction.reply({
            content: 'Vrrroooooooooooooom'
        });
    }
});