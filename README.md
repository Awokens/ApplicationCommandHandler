# Application Command Handler

The goal of this project is to simplify creating application commands.

## Installation
I already have the ``package.json`` setup so just do:
```
npm update
```
Unless you want to manually install:
```
npm i discord.js glob @types/glob util
```
# Classes
| Name         | Description                                                                                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ApplicationCommand | A basic class for representing an application command. The command's options are passed in as an ApplicationCommandType object.                                 |
| ExtendedClient     | The main class for building a Discord bot using Discord.js. This class extends the Client class and adds the ability to register and manage application commands. |

# Interfaces
| Name                                | Description                                                                                                                                                                   |
|------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ApplicationCommandType                        | An interface for defining the options for an ApplicationCommand.                                                                                                                 |
| ApplicationCommandRegisterOptions             | An interface for defining the options for registering application commands with the ExtendedClient.                                                                            |
# Application Command Properties


| Property       | Type                                                                                 | Description                                                                                                                                                           |
|----------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name           | string                                                                              | The name of the command                                                                                                                                              |
| description    | string &#124; undefined                                                            | The description of the command                                                                                                                                        |
| descriptionLocalizations | string &#124; undefined &#124; (optional)                                 | The localized description of the command                                                                                                                              |
| nameLocalizations | string &#124; undefined &#124; (optional)                                      | The localized name of the command                                                                                                                                     |
| dmPermission   | string &#124; undefined &#124; (optional)                                        | The direct message permission for the command                                                                                                                         |
| options        | ApplicationCommandOptionData[] &#124; undefined &#124; (optional)                  | The options for the command                                                                                                                                           |
| run            | RunFunction                                                                        | The function to run the command                                                                                                                                       |

# Application Command Example

Creating an application command is quite simple, here is an example below
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
## Important Notes
- Please read the [discord.js docs](https://discord.js.org/#/docs/discord.js/main/general/welcome) if you are new to discord.js
- The example commands are recognized under the directory `/commands/` as an example.
- The source code has documentation in case you need extra help on understanding the code.


