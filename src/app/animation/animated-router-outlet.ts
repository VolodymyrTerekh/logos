import { trigger, animate, transition, style, query, group, keyframes, } from '@angular/animations';

export const bounceAnimation = trigger('bounceAnimation', [

    transition('* => *', [
        group([
            query(':enter', [
                animate('1000ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
                    style({ position: 'absolute', opacity: '0', transform: 'translate3d(0px, -3000px, 0px)' , offset: 0}),
                    style({ position: 'relative', opacity: '1', transform: 'translate3d(0px, 25px, 0px)', offset: 0.6}),
                    style({ transform: 'translate3d(0px, -10px, 0px)', offset: 0.75}),
                    style({ transform: 'translate3d(0px, 5px, 0px)', offset: 0.9}),
                    style({ transform: 'translate3d(0px, 0px, 0px)', offset: 1}),
                ])),
            ], {optional: true}),
            query(':leave', [
                animate('500ms cubic-bezier(0.215, 0.61, 0.355, 1)', keyframes([
                    style({ position: 'absolute', transform: 'translate3d(0px, 10px, 0px)', offset: 0.2}),
                    style({ opacity: '1', transform: 'translate3d(0px, -20px, 0px)', offset: 0.4}),
                    style({ opacity: '1', transform: 'translate3d(0px, -20px, 0px)', offset: 0.45}),
                    style({ opacity: '0', transform: 'translate3d(0px, 2000px, 0px)', offset: 1}),
                ]))
            ], {optional: true})
        ])
    ])
  ]);