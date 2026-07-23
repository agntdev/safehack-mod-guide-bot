import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { searchResources, formatResourceCard } from "../data/resources.js";

registerMainMenuItem({ label: "🔍 Search", data: "search:prompt", order: 60 });

const composer = new Composer<Ctx>();

composer.command("search", async (ctx) => {
  ctx.session.step = "search";
  await ctx.reply("What are you looking for? Type your search query below.");
});

composer.callbackQuery("search:prompt", async (ctx) => {
  ctx.session.step = "search";
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("What are you looking for? Type your search query below.", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

composer.on("message", async (ctx, next) => {
  if (ctx.session.step !== "search") return next();
  ctx.session.step = undefined;
  const query = ctx.message.text?.trim();
  if (!query) {
    await ctx.reply("Please type a search query.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }

  const results = searchResources(query, 5);
  if (results.length === 0) {
    await ctx.reply(`No results found for "${query}". Try a different search term.`, {
      reply_markup: inlineKeyboard([
        [inlineButton("🔍 Search again", "search:prompt")],
        [inlineButton("⬅️ Back to menu", "menu:main")],
      ]),
    });
    return;
  }

  await ctx.reply(`Found ${results.length} result${results.length === 1 ? "" : "s"} for "${query}":`, {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });

  for (const resource of results) {
    await ctx.reply(formatResourceCard(resource), {
      reply_markup: inlineKeyboard([
        [
          inlineButton("🔖 Save", `bookmark:add:${resource.url}`),
          inlineButton("🚩 Report", `report:start:${resource.url}`),
        ],
        [inlineButton("⬅️ Back to menu", "menu:main")],
      ]),
    });
  }
});

export default composer;
