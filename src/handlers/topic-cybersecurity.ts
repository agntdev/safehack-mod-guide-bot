import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { getResourcesByTopic, formatResourceCard } from "../data/resources.js";

registerMainMenuItem({ label: "🔒 Cybersecurity", data: "topic:cybersecurity", order: 10 });

const composer = new Composer<Ctx>();

composer.callbackQuery("topic:cybersecurity", async (ctx) => {
  await ctx.answerCallbackQuery();
  const resources = getResourcesByTopic("cybersecurity");
  if (resources.length === 0) {
    await ctx.reply("No cybersecurity resources available yet. Check back soon!", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }
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
