import { trigger, state, style, animate, transition } from '@angular/animations';

export const slideInOutAnimation = trigger('slideInOut', [
  state('in', style({
    transform: 'translateX(0)',
    opacity: 1
  })),
  state('out', style({
    transform: 'translateX(-100%)',
    opacity: 0
  })),
  transition('in => out', [
    animate('300ms ease-out')
  ]),
  transition('out => in', [
    animate('300ms ease-in')
  ])
]);

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms', style({ opacity: 0 }))
  ])
]);
