// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {isPresent} from 'angular2/src/facade/lang';

import {IntroOptions, IntroConfig, IntroStep} from './intro.config';

let FLOAT_ELEMENT:string = 'introjsFloatingElement';

/**
 * Use steps passed programmatically
 */
export function checkSteps(steps: IntroStep[]): IntroStep[] {
    let introItems: IntroStep[] = [];

    for (var i = 0; i < steps.length; i++) {
        var currentItem: IntroStep = steps[i];
        //set the step
        currentItem.step = introItems.length + 1;
        // Get element
        currentItem.element = getElement(currentItem.selector);
        if (!isPresent(currentItem.element)) {
            currentItem.element = createDummyElement();
        }
        // If element is floating - change the position in step
        if (currentItem.element.className === FLOAT_ELEMENT) {
            currentItem.position = 'floating';
        }

        introItems.push(currentItem);
    }

    return introItems;
}

/**
 * Find element by selector or create the floating one.
 */
export function getElement(selector: string): HTMLElement {
    let targetEl: HTMLElement;

    if (isPresent(selector)) {
        targetEl = <HTMLElement>document.querySelector(selector);
    }

    return targetEl;
}

/**
 * Create dummy element
 */
function createDummyElement() {
    // We are looking for class - add 'dot' in front of FLOAT_ELEMENT
    var dDummyElement: HTMLElement = <HTMLElement>document.querySelector('.' + FLOAT_ELEMENT);

    if (!isPresent(dDummyElement)) {
        dDummyElement = document.createElement('div');
        dDummyElement.className = FLOAT_ELEMENT;

        document.body.appendChild(dDummyElement);
    }

    return dDummyElement;
}

/**
 * Start the introduction for defined selector.
 */
export function findStepsForElement(targetEl: HTMLElement, config:IntroConfig): IntroStep[] {
    let introItems: IntroStep[] = [];

    //use steps from data-* annotations
    var allIntroSteps: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>targetEl.querySelectorAll('*[ng2-intro]');
    if (allIntroSteps.length > 0) {
        addStepsWithNumbers(introItems, allIntroSteps, config);
        addStepsWithoutNumbers(introItems, allIntroSteps, config);
        introItems = normalizeSteps(introItems);
        sortSteps(introItems);
    }

    return introItems;
}

function addStepsWithNumbers(introItems: IntroStep[], allIntroSteps: NodeListOf<HTMLElement>, config:IntroConfig) {
    //first add intro items with data-step
    for (var i = 0; i < allIntroSteps.length; i++) {
        var currentElement: HTMLElement = allIntroSteps[i];
        var step = parseInt(currentElement.getAttribute('data-step'), 10);

        if (step > 0) {
            introItems[step - 1] = <IntroStep>{
                element: currentElement,
                intro: currentElement.getAttribute('data-intro'),
                step: parseInt(currentElement.getAttribute('data-step'), 10),
                tooltipClass: currentElement.getAttribute('data-tooltipClass'),
                highlightClass: currentElement.getAttribute('data-highlightClass'),
                position: currentElement.getAttribute('data-position') || config.tooltipPosition
            };
        }
    }
}

function addStepsWithoutNumbers(introItems: IntroStep[], allIntroSteps: NodeListOf<HTMLElement>, config:IntroConfig) {
    var nextStep = 0;
    for (var i = 0; i < allIntroSteps.length; i++) {
        var currentElement: HTMLElement = allIntroSteps[i];

        if (!currentElement.hasAttribute('data-step')) {

            // Find next no accomodated item in introItems array
            while (isPresent(introItems[nextStep])) {
                nextStep++;
            }

            introItems[nextStep] = <IntroStep>{
                element: currentElement,
                intro: currentElement.getAttribute('data-intro'),
                step: nextStep + 1,
                tooltipClass: currentElement.getAttribute('data-tooltipClass'),
                highlightClass: currentElement.getAttribute('data-highlightClass'),
                position: currentElement.getAttribute('data-position') || config.tooltipPosition
            };
        }
    }
}

function normalizeSteps(introItems: IntroStep[]): IntroStep[] {
    //removing undefined/null elements
    var tempIntroItems: IntroStep[] = [];
    for (var z = 0; z < introItems.length; z++) {
        let item: IntroStep = introItems[z];
        if (isPresent(item)) {
            // copy non-empty values to the end of the array
            tempIntroItems.push(item);
        }
    }
    return tempIntroItems;
}

function sortSteps(introItems: IntroStep[]) {
    introItems.sort((a: IntroStep, b: IntroStep): number => {
        return a.step - b.step;
    });
}
