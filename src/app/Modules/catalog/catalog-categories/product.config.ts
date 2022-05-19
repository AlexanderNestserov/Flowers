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
  type: 'line',
  labels: [],
  datasets: [
    {
      gradient: {
        backgroundColor: {
          axis: 'y',
          colors: {
            0: 'rgba(94, 158, 94, 0)',
            100: 'rgba(94, 158, 94, 0.15)',
          },
        },
      },
      label: '',
      data: [],
      fill: true,
      borderColor: '#5e9e5e',
      pointHoverBorderColor: '#5e9e5e',
      tension: 0.4,
    },
  ],
};

export interface LineStylesData {
  type: string;
  labels: string[];
  datasets: {
    gradient: {
      backgroundColor: {
        axis: string;
        colors: {
          0: string;
          100: string;
        };
      };
    };
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    pointHoverBorderColor: string;
    tension: number;
  }[];
}

export const OPTIONS = {
  title: {
    display: false,
  },
  plugins: {
    datalabels: {
      display: true,
      align: 'end',
      anchor: 'end',
      offset: 10,
      clamp: true,
      padding: { top: 10 },
      backgroundColor: 'transparent',
      borderRadius: 30,
      color: '#404040',
      font: {
        weight: 400,
        size: 14,
        family: 'Montserrat',
        lineHeight: '150%',
      },
    },
    tooltip: false,
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      position: 'bottom',
      ticks: {
        color: '#404040',
        font: {
          size: 14,
          weight: 400,
          family: 'Montserrat',
          lineHeight: '150%',
        },
      },
      grid: {
        color: '',
        tickColor: '#e5e5e5',
      },
    },
    y: {
      position: ' ',
      min: 70,
      max: 110,
      ticks: {
        color: '',
      },
      grid: {
        color: '',
      },
    },
  },
  elements: {
    point: {
      radius: 5,
      borderWidth: 2,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#5e9e5e',
      pointHoverRadius: 6,
      pointHoverBorderWidth: 2,
      pointHoverBackgroundColor: '#fff',
    },
  },
};

export interface Options {
  title: {
    display: boolean;
  };
  plugins: {
    datalabels: {
      display: boolean;
      align: string;
      anchor: string;
      backgroundColor: string;
      color: string;
      font: {
        weight: number;
        size: number;
        family: string;
        lineHeight: string;
      };
    };
    tooltip: boolean;
    legend: {
      display: boolean;
    };
  };
  scales: {
    x: {
      position: string;
      ticks: {
        color: string;
        font: {
          size: number;
          weight: number;
          family: string;
          lineHeight: string;
        };
      };
      grid: {
        color: string;
      };
    };
    y: {
      position: string;
      min: number;
      max: number;
      ticks: {
        color: string;
      };
      grid: {
        color: string;
      };
    };
  };
  elements: {
    point: {
      radius: number;
      borderWidth: number;
      pointBackgroundColor: string;
      pointBorderColor: string;
      pointHoverRadius: number;
      pointHoverBorderWidth: number;
      pointHoverBackgroundColor: string;
    };
  };
}

export const CATEGORIES = [
  { name: 'By cost (ascending)', key: 1 },
  { name: 'By cost (descending)', key: 2 },
  { name: 'By name (A - Z)', key: 3 },
  { name: 'By name (Z - A)', key: 4 },
];

export interface CategoriesSort {
  name: string;
  key: number;
}
