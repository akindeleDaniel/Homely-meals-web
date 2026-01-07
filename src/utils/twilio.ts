import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendWhatsApp = async (
  to: string, message: string
) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+2347046735408`,
      body: message,
    });
    console.log("WhatsApp message sent to", to);
  } catch (err) {
    console.error("Failed to send WhatsApp message:", err);
  }
};
