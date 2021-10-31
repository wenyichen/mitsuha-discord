import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types";
import { Client, Intents } from "discord.js";
import { INTEGER, Sequelize, STRING, TEXT } from "sequelize/types";
import { KARUTA_USERNAME } from "./constants";
const { TOKEN, DATABASE, USERNAME, PASSWORD, HOST, PORT } =
  process.env;

if (!TOKEN) {
	console.error("No token")
	process.exit(1);
}

// if (!(TOKEN && DATABASE && USERNAME && PASSWORD && HOST && PORT)) {
//   process.exit(1);
// }

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(TOKEN);

rest
  // @ts-ignore
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

// When the client is ready, run this code (only once)
client.once("ready", () => {
//   Tags.sync();
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.on("messageCreate", async (interaction) => {
  if (
    interaction.author.username !== KARUTA_USERNAME ||
    !interaction.author.bot
  ) {
    return;
  }
  const embed = interaction.embeds[0];
  if (embed) {
	  if (embed.title === "Visit Character")
	  embed.fields.at(0)?.name
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
