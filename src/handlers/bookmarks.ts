import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { registerMainMenuItem, inlineButton, inlineKeyboard } from "../toolkit/index.js";
import { findResourceByUrl } from "../data/resources.js";

registerMainMenuItem({ label: "🔖 Bookmarks", data: "bookmarks:list", order: 80 });

const composer = new Composer<Ctx>();

composer.callbackQuery(/^bookmark:add:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const url = ctx.match[1];
  const resource = findResourceByUrl(url);

  if (!resource) {
    await ctx.reply("Sorry, that resource is no longer available.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }

  if (!ctx.session.bookmarks) ctx.session.bookmarks = [];

  const existing = ctx.session.bookmarks.find((b) => b.url === url);
  if (existing) {
    await ctx.reply("You've already saved this resource to your bookmarks.", {
      reply_markup: inlineKeyboard([
        [inlineButton("🔖 View bookmarks", "bookmarks:list")],
        [inlineButton("⬅️ Back to menu", "menu:main")],
      ]),
    });
    return;
  }

  ctx.session.bookmarks.push({
    title: resource.title,
    url: resource.url,
    tags: resource.tags,
    addedAt: new Date().toISOString(),
  });

  await ctx.reply(`Saved "${resource.title}" to your bookmarks.`, {
    reply_markup: inlineKeyboard([
      [inlineButton("🔖 View bookmarks", "bookmarks:list")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

composer.callbackQuery("bookmarks:list", async (ctx) => {
  await ctx.answerCallbackQuery();
  const bookmarks = ctx.session.bookmarks ?? [];

  if (bookmarks.length === 0) {
    await ctx.reply("No bookmarks yet. Browse topics and save resources you want to revisit.", {
      reply_markup: inlineKeyboard([
        [inlineButton("📚 Browse Topics", "topics:list")],
        [inlineButton("⬅️ Back to menu", "menu:main")],
      ]),
    });
    return;
  }

  await ctx.reply(`You have ${bookmarks.length} bookmark${bookmarks.length === 1 ? "" : "s"}:`, {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });

  for (const bookmark of bookmarks) {
    const tags = bookmark.tags.map((t) => `#${t}`).join(" ");
    await ctx.reply(`📖 ${bookmark.title}\n\n🔗 ${bookmark.url}\n\n${tags}`, {
      reply_markup: inlineKeyboard([
        [
          inlineButton("❌ Remove", `bookmark:remove:${bookmark.url}`),
        ],
        [inlineButton("⬅️ Back to menu", "menu:main")],
      ]),
    });
  }
});

composer.callbackQuery(/^bookmark:remove:(.+)$/, async (ctx) => {
  await ctx.answerCallbackQuery();
  const url = ctx.match[1];
  if (!ctx.session.bookmarks) ctx.session.bookmarks = [];

  const index = ctx.session.bookmarks.findIndex((b) => b.url === url);
  if (index === -1) {
    await ctx.reply("That bookmark doesn't exist.", {
      reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
    });
    return;
  }

  const removed = ctx.session.bookmarks.splice(index, 1)[0];
  await ctx.reply(`Removed "${removed.title}" from your bookmarks.`, {
    reply_markup: inlineKeyboard([
      [inlineButton("🔖 View bookmarks", "bookmarks:list")],
      [inlineButton("⬅️ Back to menu", "menu:main")],
    ]),
  });
});

export default composer;
