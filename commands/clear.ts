import { ApplicationCommandOptionType as OptionType} from "discord.js";
import { ApplicationCommand } from "../structure/ApplicationCommand";

export default new ApplicationCommand({
    name: 'clear',
    description: 'Clear a specific amount of messages',
    options: [
        {
            name: 'amount',
            description: 'The amount to clear up to 100 max',
            maxValue: 100,
            minValue: 1,
            required: true,
            type: OptionType.Integer
        }
    ],
    run: async ({ interaction }) => {
        // do stuff
    }
})