// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

export class IntroOptions {

    constructor(
        /* Next button label in tooltip box */
        public nextLabel:string = 'Next &rarr;',
        /* Previous button label in tooltip box */
        public prevLabel:string = '&larr; Back',
        /* Skip button label in tooltip box */
        public skipLabel:string = 'Skip',
        /* Done button label in tooltip box */
        public doneLabel:string = 'Done',
        /* Default tooltip box position */
        public tooltipPosition:string = 'bottom',
        /* Next CSS class for tooltip boxes */
        public tooltipClass:string = '',
        /* CSS class that is added to the helperLayer */
        public highlightClass:string = '',
        /* Close introduction when pressing Escape button? */
        public exitOnEsc:boolean = true,
        /* Close introduction when clicking on overlay layer? */
        public exitOnOverlayClick:boolean = true,
        /* Show step numbers in introduction? */
        public showStepNumbers:boolean = true,
        /* Let user use keyboard to navigate the tour? */
        public keyboardNavigation:boolean = true,
        /* Show tour control buttons? */
        public showButtons:boolean = true,
        /* Show tour bullets? */
        public showBullets:boolean = true,
        /* Show tour progress? */
        public showProgress:boolean = false,
        /* Scroll to highlighted element? */
        public scrollToElement:boolean = true,
        /* Set the overlay opacity */
        public overlayOpacity:number = 0.8,
        /* Precedence of positions; when auto is enabled */
        public positionPrecedence:string[] = ["bottom", "top", "right", "left"],
        /* Disable an interaction with element? */
        public disableInteraction:boolean = false,
        /* Default hint position */
        public hintPosition:string = 'top-middle',
        /* Hint button label */
        public hintButtonLabel:string = 'Got it')
    {}
}

export class IntroStep {

    constructor(
        public selector:string,
        public element:HTMLElement,
        public intro: string,
        public step:number,
        public position:string,
        public tooltipClass:string,
        public highlightClass:string
    ) {}
}

export class IntroConfig extends IntroOptions {
    tooltipPosition:string = 'bottom';
}