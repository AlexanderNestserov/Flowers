export const PRODUCT_TYPE = {
  category: {
    description:
      'For several years now, our company has been delighting customers with the delivery of flowers and congratulations. We are really proud of the clear and well-coordinated work of our employees and are always confident that your order will be delivered at the right time to the right place.',
    id: 1050,
    name: 'Fresh flowers',
    photo: '"fresh-flowers-photo.jpg"',
    thumbnail: 'images/categories/Flowers-thumbnail',
  },
  description:
    'Perfect for floral enthusiasts of every persuasion, there’s always room for this beauty on a window sill or dining table.',
  id: 1056,
  name: 'LEMON AND LIME',
  photo: 'flower-7-photo.jpg',
  priceDto: {
    date: '2021-08-10 14:10',
    id: 1056,
    itemId: 1056,
    price: 86.99,
  },
  promotion: {
    id: 1056,
    itemId: 1056,
    promotion: 70,
  },
  shortDescription: 'This bouquet is the epitome of affordable luxury',
  thumbnail: 'flower-7-thumbnail.jpg',
};

export interface ProductType {
  category: {
    description: string;
    id: number;
    name: string;
    photo: string;
    thumbnail: string;
  };
  description: string;
  id: number;
  name: string;
  photo: string;
  priceDto: {
    date: string;
    id: number;
    itemId: number;
    price: number;
  };
  promotion: {
    id: number;
    itemId: number;
    promotion: number;
  };
  shortDescription: string;
  thumbnail: string;
  quantity?: number;
}

export interface AddItem {
  id: number;
  quantity: number;
  priceDto: { id: number };
  category: { name: string };
}
