export type TReceipt = {
  _id: string;
  phoneNumber: string;
  customerName: string;
  orders: {
    order_name: string;
    order_price: number;
    order_count: number;
  }[]; //(string | number)[][];
};

export async function getReceipt(phone: string): Promise<TReceipt[]> {
  const response = await fetch(`http://localhost:5000/receipts/${phone}`);

  return response.json();
}
