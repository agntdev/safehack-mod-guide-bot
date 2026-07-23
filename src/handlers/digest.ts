import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";

registerMainMenuItem({ label: "📬 Digest", data: "digest:manage", order: 90 });

const composer = new Composer<Ctx>();

composer.callbackQuery("digest:manage", async (ctx) => {
  await ctx.answerCallbackQuery();
  const digest = ctx.session.digest;

  if (digest) {
    await ctx.reply(
      `You're subscribed to the ${digest.frequency} digest.\n\n` +
        `Topics: ${digest.topics.length > 0 ? digest.topics.join(", ") : "All topics"}`,
      {
        reply_markup: inlineKeyboard([
          [inlineButton("🔄 Change frequency", "digest:change")],
          [inlineButton("❌ Unsubscribe", "digest:unsubscribe")],
          [inlineButton("⬅️ Back to menu", "menu:main")],
        ]),
      },
    );
  } else {
    await ctx.reply("Get curated resources delivered to you regularly.", {
      reply_markup: inlineKeyboard([
        [inlineButton("📅 Daily digest", "digest:subscribe:daily")],
        [inlineButton("📆 Weekly digest", "digest:subscribe:weekly")],
        [inlineButton("⬅️ Back to menu", "menu:main")],
      ]),
    });
  }
});

composer.callbackQuery(/^digest:subscribe:(daily|weekly)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const frequency = ctx.match[1] as "daily" | "weekly";

  ctx.session.digest = {
    frequency,
    subscribedAt: new Date().toISOString(),
    topics: [],
  };

  await ctx.reply(
    `You're now subscribed to the ${frequency} digest. You'll receive curated resources based on your saved topics.`,
    {
      reply_markup: inlineKeyboard([
        [inlineButton("⬅️ Back to menu", "menu:main")],
      ]),
    },
  );
});

composer.callbackQuery("digest:change", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("Choose your digest frequency:", {
    reply_markup: inlineKeyboard([
      [inlineButton("📅 Daily", "digest:subscribe:daily")],
      [inlineButton("📆 Weekly", "digest:subscribe:weekly")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("digest:unsubscribe", async (ctx) => {
  await ctx.answerCallbackQuery();

  if (!ctx.session.digest) {
    await ctx.reply("You're not subscribed to any digest.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }

  delete ctx.session.digest;
  await ctx.reply("You've been unsubscribed from the digest.", {
    reply_markup: inlineKeyboard([
      [inlineButton("📬 Subscribe again", "digest:manage")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

export default composer;
