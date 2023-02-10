## About
This project's purpose is to simplify the creation of Discord bot commands using Discord.js
- Make sure to read the [discord.js docs](https://discord.js.org/#/docs/discord.js/main/general/welcome) if you're new to discord.js.
- The source code has documentation to help you understand the code.

## Installation

Before installing, Node.js 16.9.0 or newer is required.

To install the required packages, run the following command:
```
npm update
```
If you want to install the packages manually, run the following command:
```
npm i discord.js glob @types/glob util
```
## Classes
| Name         | Description                                                                                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ApplicationCommand | A basic class for representing an application command. The command's options are passed in as an ApplicationCommandType object.                                 |
| ExtendedClient     | The main class for building a Discord bot using Discord.js. This class extends the Client class and adds the ability to register and manage application commands. |

## Interfaces
| Name                                | Description                                                                                                                                                                   |
|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ApplicationCommandType                        | An interface for defining the options for an ApplicationCommand.                                                                                                                 |
| ApplicationCommandRegisterOptions             | An interface for defining the options for registering application commands with the ExtendedClient.                                                                            |
## Application Command Properties


| Property       | Type                                                                                 | Description                                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name           | string                                                                              | The name of the command                                                                                                                                              |
| description    | string &#124; undefined                                                            | The description of the command                                                                                                                                        |
| descriptionLocalizations | string &#124; undefined &#124; (optional)                                 | The localized description of the command                                                                                                                              |
| nameLocalizations | string &#124; undefined &#124; (optional)                                      | The localized name of the command                                                                                                                                     |
| dmPermission   | string &#124; undefined &#124; (optional)                                        | The direct message permission for the command                                                                                                                         |
| options        | ApplicationCommandOptionData[] &#124; undefined &#124; (optional)                  | The options for the command                                                                                                                                           |
| run            | RunFunction                                                                        | The function to run the command                                                                                                                                       |

## Application Command Example
```typescript
export default new ApplicationCommand({
    name: 'example',
    description: 'This is an example command',
    run: ({ interaction }) => {
        interaction.reply({
            content: 'Hello, World'
        });
    }
});

```


