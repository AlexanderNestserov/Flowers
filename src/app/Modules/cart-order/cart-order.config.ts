export interface CreateCart {
  id: number;
  orderItems: AddItem[];
  text: string;
}

export interface AddItem {
  id: number;
  itemId: number;
  priceId: number;
  quantity: number;
}

export interface KeyItem {
  id: number;
  deleteId: number;
  total: number;
  quantity: number;
  priceDto: { price: number };
}

export interface EventInput {
  originalEvent?: KeyboardEvent;
  value: number;
}
