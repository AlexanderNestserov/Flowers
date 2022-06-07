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

export interface PriceChanges {
  date: string;
  id: number;
  itemId: number;
  price: number;
}

export interface OrderCheckout {
  deliveryAddress: string;
  deliveryName: string;
  deliveryTime: string;
  email: string;
  id: number;
  orderStatus?: string;
  paymentType: string;
  phone: string;
  productItems: AddItem[];
  text: string;
}

export interface GetAllOrders {
  creationDate: string;
  deliveryAddress: string;
  deliveryName: string;
  deliveryTime: string;
  email: string;
  id: number;
  orderStatus?: string;
  paymentType: string;
  phone: string;
  productItems: AddItem[];
  text: string;
}

export interface StripePostOrders {
  amount: number;
  currency: 'EUR';
  description: string;
  productOrderId: number;
  stripeEmail: string;
  stripeToken: string;
}
