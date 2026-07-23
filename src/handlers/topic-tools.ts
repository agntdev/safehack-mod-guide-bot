import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { getResourcesByTopic, formatResourceCard } from "../data/resources.js";

registerMainMenuItem({ label: "🛠 Tools", data: "topic:tools", order: 40 });

const composer = new Composer<Ctx>();

composer.callbackQuery("topic:tools", async (ctx) => {
  await ctx.answerCallbackQuery();
  const resources = getResourcesByTopic("tools");
  if (resources.length === 0) {
    await ctx.reply("No tools or frameworks available yet. Check back soon!", {
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
