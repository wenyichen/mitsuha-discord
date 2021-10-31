"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const discord_js_1 = require("discord.js");
const constants_1 = require("./constants");
const { TOKEN, DATABASE, USERNAME, PASSWORD, HOST, PORT } = process.env;
if (!TOKEN) {
    console.error("No token");
    process.exit(1);
}
// if (!(TOKEN && DATABASE && USERNAME && PASSWORD && HOST && PORT)) {
//   process.exit(1);
// }
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
// var sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
//   host: HOST,
//   port: Number(PORT),
//   logging: console.log,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: "Amazon RDS",
//   },
// });
/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255) UNIQUE,
 * description TEXT,
 * username VARCHAR(255),
 * usage_count  INT NOT NULL DEFAULT 0
 * );
 */
// const Tags = sequelize.define("tags", {
//   name: {
//     type: STRING,
//     unique: true,
//   },
//   description: TEXT,
//   username: STRING,
//   usage_count: {
//     type: INTEGER,
//     defaultValue: 0,
//     allowNull: false,
//   },
// });
const commands = [
    new builders_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong!"),
].map((command) => command.toJSON());
const rest = new rest_1.REST({ version: "9" }).setToken(TOKEN);
rest
    // @ts-ignore
    .put(v9_1.Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
// When the client is ready, run this code (only once)
client.once("ready", () => {
    //   Tags.sync();
    console.log("Ready!");
});
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand())
        return;
    const { commandName } = interaction;
    if (commandName === "ping") {
        await interaction.reply("Pong!");
    }
});
client.on("messageCreate", async (interaction) => {
    console.log(interaction);
    if (interaction.author.username !== constants_1.KARUTA_USERNAME ||
        !interaction.author.bot) {
        return;
    }
    const embed = interaction.embeds[0];
    if (embed) {
        if (embed.title === "Visit Character") {
            console.log(interaction);
        }
    }
    // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
    //   const tag = await Tags.upsert({
    //     name: "",
    //     description: "",
    //     username: "",
    //   });
    //   return;
});
// client.on("messageUpdate", async (interaction) => {
// 	interaction.
// 	if (
// 	  interaction.author.username !== KARUTA_USERNAME ||
// 	  !interaction.author.bot
// 	) {
// 	  return;
// 	}
//   // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
//   const tag = await Tags.upsert({
//     name: "",
//     description: "",
//     username: "",
//   });
// });
// Login to Discord with your client's token
client.login(TOKEN);
