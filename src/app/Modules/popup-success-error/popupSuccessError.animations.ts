import { animate, state, style, transition, trigger } from '@angular/animations';

export const divTrigger = trigger('divTrigger', [
    state('hide', style({
        position: 'fixed',
        right: '1rem',
        top: '-20rem',
        width: '36.5rem',
        height: '16.3rem',
        background: 'white',
        boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1.6rem'
    })),
    state('show', style({
        position: 'fixed',
        right: '1rem',
        top: '-20rem',
        width: '36.5rem',
        height: '16.3rem',
        background: 'white',
        boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1.6rem'
    })),
    transition('hide=>show', [
        style({
            position: 'fixed',
            right: '1rem',
            top: '-20rem',
            width: '36.5rem',
            height: '16.3rem',
            background: 'white',
            boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
            borderRadius: '1.6rem'
        }),
        animate('0.5s', style({
            position: 'fixed',
            right: '1rem',
            top: '10rem',
            width: '36.5rem',
            height: '16.3rem',
            background: 'white',
            boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
            borderRadius: '1.6rem'
        })),
        animate('0.5s 4s')
    ]),
    transition('show=>hide', animate('0.5s'))
]);

export const divTriggerError = trigger('divTriggerError', [
    state('hide', style({
        position: 'fixed',
        right: '1rem',
        top: '-20rem',
        width: '36.5rem',
        height: '16.3rem',
        background: 'white',
        boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1.6rem'
    })),
    state('show', style({
        position: 'fixed',
        right: '1rem',
        top: '10rem',
        width: '36.5rem',
        height: '16.3rem',
        background: 'white',
        boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
        borderRadius: '1.6rem'
    })),
    transition('hide=>show', [
        style({
            position: 'fixed',
            right: '1rem',
            top: '-20rem',
            width: '36.5rem',
            height: '16.3rem',
            background: 'white',
            boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
            borderRadius: '1.6rem'
        }),
        animate('0.5s', style({
            position: 'fixed',
            right: '1rem',
            top: '10rem',
            width: '36.5rem',
            height: '16.3rem',
            background: 'white',
            boxShadow: '0px 1rem 2.5rem rgba(0, 0, 0, 0.1)',
            borderRadius: '1.6rem'
        })),
        animate('0.5s 4s')
    ]),
    transition('show=>hide', animate('0.5s'))
]);
