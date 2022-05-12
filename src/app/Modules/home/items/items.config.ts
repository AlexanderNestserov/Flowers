export interface Items {
  content: [
    {
      category: {
        description: 'The best flowers';
        id: 0;
        name: 'Flowers';
        photo: 'images/categories/Flowers-photo';
        thumbnail: 'images/categories/Flowers-thumbnail';
      };
      description: 'A beautiful collection of Spray Carnations in shades of pink accompanied by Alstroemeria and delicately complemented by Gypsophila.';
      id: 0;
      name: 'Birthday Flowers';
      photo: 'image-photo';
      priceDto: {
        date: '2021-07-12 14:22';
        id: 0;
        itemId: 42;
        price: 99.99;
      };
      promotion: {
        id: 0;
        itemId: 42;
        promotion: 50;
      };
      shortDescription: 'Pink and cream flowers';
      thumbnail: 'image-thumbnail';
    }
  ];
  empty: true;
  first: true;
  last: true;
  number: 0;
  numberOfElements: 0;
  pageable: {
    offset: 0;
    pageNumber: 0;
    pageSize: 0;
    paged: true;
    sort: {
      empty: true;
      sorted: true;
      unsorted: true;
    };
    unpaged: true;
  };
  size: 0;
  sort: {
    empty: true;
    sorted: true;
    unsorted: true;
  };
  totalElements: 0;
  totalPages: 0;
}

export interface Item {
  category: {
    description: 'The best flowers';
    id: 0;
    name: 'Flowers';
    photo: 'images/categories/Flowers-photo';
    thumbnail: 'images/categories/Flowers-thumbnail';
  };
  description: 'A beautiful collection of Spray Carnations in shades of pink accompanied by Alstroemeria and delicately complemented by Gypsophila.';
  id: 0;
  name: 'Birthday Flowers';
  photo: 'image-photo';
  priceDto: {
    date: '2021-07-12 14:22';
    id: 0;
    itemId: 42;
    price: 99.99;
  };
  promotion: {
    id: 0;
    itemId: 42;
    promotion: 50;
  };
  shortDescription: 'Pink and cream flowers';
  thumbnail: 'image-thumbnail';
}
