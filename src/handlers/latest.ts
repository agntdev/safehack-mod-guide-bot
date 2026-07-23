import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { getLatestResources, formatResourceCard } from "../data/resources.js";

registerMainMenuItem({ label: "📰 Latest", data: "latest:show", order: 70 });

const composer = new Composer<Ctx>();

composer.command("latest", async (ctx) => {
  const resources = getLatestResources(5);
  if (resources.length === 0) {
    await ctx.reply("No resources available yet. Check back soon!", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }
  await ctx.reply("Here are the latest resources:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
  for (const resource of resources) {
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

composer.callbackQuery("latest:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  const resources = getLatestResources(5);
  if (resources.length === 0) {
    await ctx.editMessageText("No resources available yet. Check back soon!", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }
  await ctx.editMessageText("Here are the latest resources:", {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
  for (const resource of resources) {
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
