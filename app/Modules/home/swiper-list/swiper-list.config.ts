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