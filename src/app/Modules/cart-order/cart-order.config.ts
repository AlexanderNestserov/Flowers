export class CreateCart {
  id = 0;
  orderItems = [
    {
      id: 0,
      itemId: 42,
      priceId: 42,
      quantity: 3,
    },
  ];
  text = '';
}

export class AddItem {
  id = 0;
  itemId = 42;
  priceId = 42;
  quantity = 1;
}
