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

export const LINE_STYLES_DATA = {
  labels: ['04.07', '09.07', '14.07', '19.07', '24.07', '29.07'],
  datasets: [
    {
      label: '',
      data: [92, 90, 91, 80, 87, 95],
      fill: true,
      borderColor: '#5e9e5e',
      tension: 0.4,
      background:
        'linear-gradient(180deg, rgba(94, 158, 94, 0.15) 0%, rgba(94, 158, 94, 0) 100%);',
    },
  ],
};
export interface LineStylesData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
    background: string;
  }[];
}

export const OPTIONS = {
  title: {
    display: true,
    text: 'My Title',
    fontSize: 16,
  },

  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
    },
  },
  scales: {
    x: {
      position: 'bottom',
      ticks: {
        color: '#495057',
      },
      grid: {
        color: '',
      },
    },
    y: {
      position: ' ',
      ticks: {
        color: '#495057',
      },
      grid: {
        color: '',
      },
    },
  },
};

export interface Options {
  title: {
    display: boolean;
    text: string;
    fontSize: number;
  };
  plugins: {
    legend: {
      labels: {
        color: '#495057';
      };
    };
  };
  scales: {
    x: {
      ticks: {
        color: '#495057';
      };
      grid: {
        color: '#ebedef';
      };
    };
    y: {
      ticks: {
        color: '#495057';
      };
      grid: {
        color: '#ebedef';
      };
    };
  };
}
