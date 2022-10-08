const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const { ContextMenuCommandInteraction, Client } = require("discord.js"),
  Sequelize = require("sequelize");
const translate = require("translate-google");
//https://github.com/shikar/NODE_GOOGLE_TRANSLATE/blob/master/languages.js
const langs = {
  auto: "Automatic",
  af: "Afrikaans",
  sq: "Albanian",
  ar: "Arabic",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  ceb: "Cebuano",
  ny: "Chichewa",
  "zh-cn": "Chinese Simplified",
  "zh-tw": "Chinese Traditional",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  tl: "Filipino",
  fi: "Finnish",
  fr: "French",
  fy: "Frisian",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  iw: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  jw: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  ko: "Korean",
  ku: "Kurdish (Kurmanji)",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mn: "Mongolian",
  my: "Myanmar (Burmese)",
  ne: "Nepali",
  no: "Norwegian",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  ma: "Punjabi",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  gd: "Scots Gaelic",
  sr: "Serbian",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  su: "Sudanese",
  sw: "Swahili",
  sv: "Swedish",
  tg: "Tajik",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};
function getCode(desiredLang) {
  if (!desiredLang) {
    return false;
  }
  desiredLang = desiredLang.toLowerCase();
  if (langs[desiredLang]) {
    return desiredLang;
  }
  var keys = Object.keys(langs).filter((key) => {
    if (typeof langs[key] !== "string") {
      return false;
    }
    return langs[key].toLowerCase() === desiredLang;
  });
  return keys[0] || false;
}

function isSupported(desiredLang) {
  return Boolean(getCode(desiredLang));
}
// ------------------------------------------------------

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Translate Message")
    .setType(ApplicationCommandType.Message),
  /**
   * Executes the command
   * @param {ContextMenuCommandInteraction} interaction
   * @param {Client} client
   * @param {*} config
   * @param {Sequelize} db
   * @param {Array} allowed
   */
  async execute(interaction, client, config, db, allowed) {
    let msg = await interaction.channel.messages.fetch(interaction.targetId);
    let text = msg.content;
    let langstring = JSON.stringify(langs);

    const modal = new ModalBuilder()
      .setCustomId("translatemessage")
      .setTitle("Translate Message");
    const question = new TextInputBuilder()
      .setCustomId("lang")
      .setLabel("What language would you like to translate to?")
      .setStyle(TextInputStyle.Short);
    const action = new ActionRowBuilder().addComponents(question);
    modal.addComponents(action);

    await interaction.showModal(modal);
    const filter = (interaction) => interaction.customId === "translatemessage";
    interaction
      .awaitModalSubmit({ filter, time: 60_000 })
      .then(async (int) => {
        let resLang = int.fields.getTextInputValue("lang");
        if (!isSupported(resLang))
          return int.reply({
            content: `Please use a supported language code:\n\`${langstring.replaceAll(
              ",",
              `\n`
            )}\``,
            ephemeral: true,
          });

        await int.deferReply();

        try {
          let result = await translate(text, { to: resLang });
          int.editReply(`${result}`);
        } catch (e) {
          int.editReply({ content: `Error, try again!`, ephemeral: true });
        }
      })
      .catch((e) => {
        return;
      });
  },
};
