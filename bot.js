// Import required modules
const { 
    Client, 
    GatewayIntentBits, 
    ActivityType, 
    PresenceUpdateStatus, 
    ButtonBuilder, 
    ButtonStyle, 
    ActionRowBuilder 
} = require('discord.js'); // Core Discord.js library

// Fake token for the bot (Replace with your actual token for real deployment)
const TOKEN = "MTI5MjA2NjgwOTA1MDMwMDQ5OA.GLLPRN.Ynljqwd2S3bJH1Zj55Eq7dAVn7IG7GYuLWSG94";

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Set custom rich presence
    client.user.setPresence({
        activities: [
            {
                name: "axelet.lol", // Custom status
                type: ActivityType.Watching // Activity type: Watching
            }
        ],
        status: PresenceUpdateStatus.Idle // Status: Away
    });

    console.log("Custom rich presence set!");
});

// Interaction for button functionality
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'website') {
        await interaction.reply({
            content: "Visit the website: https://axelet.lol",
            ephemeral: true // Only the user who clicked will see the response
        });
    }
});

// Message handling to send an embed with a button
client.on('messageCreate', message => {
    if (message.content.toLowerCase() === '!info') {
        const button = new ButtonBuilder()
            .setLabel('Website')
            .setStyle(ButtonStyle.Link) // Style: Link to external URL
            .setURL('https://axelet.lol') // Target URL
            .setCustomId('website'); // Custom ID for interaction handling

        const row = new ActionRowBuilder().addComponents(button);

        message.channel.send({
            content: "Click the button below to visit the website!",
            components: [row]
        });
    }
});

// Log in to the bot using the token
client.login(TOKEN);
