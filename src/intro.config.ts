// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

export class IntroOptions {
    /* Next button label in tooltip box */
    nextLabel:string = 'Next &rarr;';
    /* Previous button label in tooltip box */
    prevLabel:string = '&larr; Back';
    /* Skip button label in tooltip box */
    skipLabel:string = 'Skip';
    /* Done button label in tooltip box */
    doneLabel:string = 'Done';
    /* Default tooltip box position */
    tooltipPosition:string = 'bottom';
    /* Next CSS class for tooltip boxes */
    tooltipClass:string = '';
    /* CSS class that is added to the helperLayer */
    highlightClass:string = '';
    /* Close introduction when pressing Escape button? */
    exitOnEsc:boolean = true;
    /* Close introduction when clicking on overlay layer? */
    exitOnOverlayClick:boolean = true;
    /* Show step numbers in introduction? */
    showStepNumbers:boolean = true;
    /* Let user use keyboard to navigate the tour? */
    keyboardNavigation:boolean = true;
    /* Show tour control buttons? */
    showButtons:boolean = true;
    /* Show tour bullets? */
    showBullets:boolean = true;
    /* Show tour progress? */
    showProgress:boolean = false;
    /* Scroll to highlighted element? */
    scrollToElement:boolean = true;
    /* Set the overlay opacity */
    overlayOpacity:number = 0.8;
    /* Precedence of positions; when auto is enabled */
    positionPrecedence:string[] = ["bottom", "top", "right", "left"];
    /* Disable an interaction with element? */
    disableInteraction:boolean = false;
    /* Default hint position */
    hintPosition:string = 'top-middle';
    /* Hint button label */
    hintButtonLabel:string = 'Got it'
}

export class IntroConfig {

}