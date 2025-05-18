const apiKey = "3ffd24aad32cafe2142064ae";

async function convertToUSD(amount, fromCurrency) {
  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/USD`);
    const data = await res.json();
    const usdAmount = amount * data.conversion_rate;
    return usdAmount.toFixed(2);
  } catch (error) {
    console.error("Currency conversion failed:", error);
    return null;
  }
}
