export interface Item {
    id: number,
    link: string,
    imageUrl: string,
    title: string,
    text: string
}

export const ITEMS =
    [
        {
            id: 1,
            link: '',
            imageUrl: '../../../assets/img-home/logo.jpg',
            title: 'Fresh flowers',
            text: 'from 17,35 eur.'
        },
        {
            id: 2,
            link: '',
            imageUrl: '../../../assets/img-home/plant 1.png',
            title: 'Indoor plants',
            text: 'from 9,45 eur.'
        },
        {
            id: 3,
            link: '',
            imageUrl: '../../../assets/img-home/sprout 1.png',
            title: 'Planting material',
            text: 'more than 500 species'
        },
        {
            id: 4,
            link: '',
            imageUrl: '../../../assets/img-home/vase 1.png',
            title: 'Floral accessories',
            text: 'more than 500 species'
        },
        {
            id: 5,
            link: '',
            imageUrl: '../../../assets/img-home/bonsai 1.png',
            title: 'Compositions made of artificial materials...',
            text: 'for home comfort'
        },
        {
            id: 6,
            link: '',
            imageUrl: '../../../assets/img-home/fountain 1.png',
            title: 'Landscape design',
            text: 'for your garden'
        }
    ]

export interface Config {
    slidesPerView: number,
    spaceBetween: number,
    loop: boolean,
    pagination: {
        clickable: boolean
    },
    navigation: boolean
}

export const SWIPER_CONFIG =
{
    slidesPerView: 6,
    spaceBetween: 20,
    loop: true,
    pagination: {
        clickable: true
    },
    navigation: true
}

export interface Adaptive {
    [key: string]: {
        slidesPerView: number,
        spaceBetween: number
    }
}

export const ADAPTIVE_SWIPER =
{
    '200': {
        slidesPerView: 1,
        spaceBetween: 20
    },
    '450': {
        slidesPerView: 2,
        spaceBetween: 20
    },
    '640': {
        slidesPerView: 2,
        spaceBetween: 20
    },
    '880': {
        slidesPerView: 4,
        spaceBetween: 20
    },
    '1400': {
        slidesPerView: 6,
        spaceBetween: 20
    }
}
