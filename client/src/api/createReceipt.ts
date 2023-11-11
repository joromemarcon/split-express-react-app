export async function createReceipt(
  phoneNumber: string,
  customerName: string,
  orders: Array<string>
) {
  fetch("http://localhost:5000/receipts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phoneNumber: phoneNumber,
      customerName: customerName,
      orders: orders,
    }),
  });
}
