export type TReceipt = {
  _id: string;
  phoneNumber: string;
  customerName: string;
  orders: {
    order_name: string;
    order_price: number;
    order_count: number;
  }[]; //(string | number)[][]
  peoplePaid: {
    peer_name: string;
    items_paid: string[];
  }[];
};

export async function getReceipt(phone: string): Promise<TReceipt[]> {
  const response = await fetch(
    `http://localhost:5000/receipts/payhost/${phone}`
  );

  return response.json();
}
