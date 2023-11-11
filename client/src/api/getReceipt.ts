export type TReceipt = {
  _id: string;
  phoneNumber: string;
  customerName: string;
  orders: Array<string>;
};

export async function getReceipt(phone: string): Promise<TReceipt[]> {
  const response = await fetch(`http://localhost:5000/receipts/${phone}`);

  return response.json();
}
