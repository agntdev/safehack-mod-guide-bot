import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { TOPICS } from "../data/resources.js";

registerMainMenuItem({ label: "📚 Browse Topics", data: "topics:list", order: 5 });

const composer = new Composer<Ctx>();

composer.command("topics", async (ctx) => {
  const buttons = TOPICS.map((t) => [inlineButton(`${t.emoji} ${t.name}`, `topic:${t.id}`)]);
  buttons.push([inlineButton("⬅️ Back to menu", "menu:main")]);
  await ctx.reply("Choose a topic to explore:", {
    reply_markup: inlineKeyboard(buttons),
  });
});

composer.callbackQuery("topics:list", async (ctx) => {
  await ctx.answerCallbackQuery();
  const buttons = TOPICS.map((t) => [inlineButton(`${t.emoji} ${t.name}`, `topic:${t.id}`)]);
  buttons.push([inlineButton("⬅️ Back to menu", "menu:main")]);
  await ctx.editMessageText("Choose a topic to explore:", {
    reply_markup: inlineKeyboard(buttons),
  });
});

export default composer;
