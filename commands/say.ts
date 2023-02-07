import { ApplicationCommand } from "../structure/ApplicationCommand";

export default new ApplicationCommand({
    name: 'say',
    description: 'Say something',
    options: [
        {
            name: 'input',
            description: 'the input',
            type: 3,
            required: true
        }
    ],
    run: async ({ interaction }) => {
        interaction.reply({
            content: interaction.options.getString('input') as string,
            ephemeral: true
        });
    }
});