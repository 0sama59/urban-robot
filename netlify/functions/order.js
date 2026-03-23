exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, phone, address, items, total } = JSON.parse(event.body);

  const TELEGRAM_BOT_TOKEN = "7976020448:AAFvA_xUO4JMIGueFSCL4UisQ2LG2UpaCWk";
  const TELEGRAM_CHAT_ID = "7265975306";

  const itemsSummary = items.map(i => `• ${i.nameen} (x${i.qty})`).join("\n");
  const messageText =
    `🛍 <b>New Order from Lunaglow</b>\n\n` +
    `👤 <b>Customer:</b> ${name}\n` +
    `📞 <b>Phone:</b> ${phone}\n` +
    `📍 <b>Address:</b> ${address}\n\n` +
    `🛒 <b>Items:</b>\n${itemsSummary}\n\n` +
    `💰 <b>Total:</b> ₪${total}`;

  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: messageText, parse_mode: 'HTML' })
  });

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};