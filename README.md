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

## Class Definitions
- ApplicationCommand - A basic class for representing an application command. The command's options are passed in as an ApplicationCommandType object.
- ExtendedClient - The main class for building a Discord bot using Discord.js. This class extends the Client class and adds the ability to register and manage application commands.

## Interfaces
- ApplicationCommandType - An interface for defining the options for an ApplicationCommand.
- ApplicationCommandRegisterOptions - An interface for defining the options for registering application commands with the ExtendedClient.

## Documentation

Creating an application command is quite simple, here are two examples:
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

```javascript
module.export = new ApplicationCommand({
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
- The example commands are recognized under the directory `/commands/` as an example.
- The source code has documentation in case you need extra help on understanding the code.
