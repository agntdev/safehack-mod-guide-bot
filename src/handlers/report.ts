import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { findResourceByUrl } from "../data/resources.js";

interface Report {
  url: string;
  reason: string;
  reportedAt: string;
  reportedBy: number;
}

const composer = new Composer<Ctx>();

composer.callbackQuery(/^report:start:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const url = ctx.match[1];
  const resource = findResourceByUrl(url);

  if (!resource) {
    await ctx.reply("Sorry, that resource is no longer available.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }

  await ctx.reply(
    `You're reporting: ${resource.title}\n\nWhy are you reporting this resource?`,
    {
      reply_markup: inlineKeyboard([
        [inlineButton("Inaccurate information", `report:submit:${url}:inaccurate`)],
        [inlineButton("Broken link", `report:submit:${url}:broken`)],
        [inlineButton("Inappropriate content", `report:submit:${url}:inappropriate`)],
        [inlineButton("Spam", `report:submit:${url}:spam`)],
        [inlineButton("Other", `report:submit:${url}:other`)],
        [inlineButton("Cancel", "menu:main")],
      ]),
    },
  );
});

composer.callbackQuery(/^report:submit:(.+):(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const url = ctx.match[1];
  const reason = ctx.match[2];
  const resource = findResourceByUrl(url);

  if (!resource) {
    await ctx.reply("Sorry, that resource is no longer available.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }

  const userId = ctx.from?.id;
  if (!userId) {
    await ctx.reply("Couldn't submit report. Please try again later.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }

  const report: Report = {
    url,
    reason,
    reportedAt: new Date().toISOString(),
    reportedBy: userId,
  };

  console.log("[report]", JSON.stringify(report));

  await ctx.reply(
    `Thank you for your report. We've received your feedback about "${resource.title}" and will review it shortly.`,
    {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    },
  );
});

export default composer;
