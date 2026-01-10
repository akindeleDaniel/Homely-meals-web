import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const Telegram = async (text: string) => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("Telegram BOT_TOKEN or CHAT_ID not set in .env");
    return;
  }

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "Markdown", 
        }),
      }
    );

    const data = await res.json();
    if (!data) {
      console.error("Telegram API error:", data);
    }
  } catch (err) {
    console.error("Failed to send Telegram message:", err);
  }
};
