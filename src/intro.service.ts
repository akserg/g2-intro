// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {isPresent} from 'angular2/src/facade/lang';

import {Intro} from './intro.directive';
import {IntroOptions, IntroConfig, IntroStep} from './intro.config';

export class IntroService {

    constructor(private config: IntroConfig) { }

    start(steps: IntroStep[] = null, selector: string = null) {
        let introItems: IntroStep[];

        if (isPresent(steps)) {
            introItems = this.checkSteps(steps);
        } else if (isPresent(selector)) {
            introItems = this.findStepsFromSelector(selector);
        } else {
            throw new Error('Selector or steps must be provided');
        }
        // Start show
        this.show(introItems);
    }

    /**
     * Use steps passed programmatically
     */
    checkSteps(steps: IntroStep[]): IntroStep[] {
        let introItems: IntroStep[] = [];

        for (var i = 0; i < steps.length; i++) {
            var currentItem: IntroStep = steps[i]; //_cloneObject(steps[i]);
            //set the step
            currentItem.step = introItems.length + 1;
            // Get element
            currentItem.element = this.getElement(currentItem.selector);
            // If element is floating - change the position in step
            if (currentItem.element.className === 'introjsFloatingElement') {
                currentItem.position = 'floating';
            }

            introItems.push(currentItem);
        }

        return introItems;
    }

    /**
     * Start the introduction for defined selector.
     */
    findStepsFromSelector(selector: string): IntroStep[] {
        let introItems: IntroStep[];

        let targetEl: HTMLElement;
        if (selector) {
            // Find element with selector
            targetEl = <HTMLElement>document.querySelector(selector);
            if (targetEl) {
                introItems = this.findStepsForElement(targetEl);
            }
        }

        return introItems || [];
    }


    /**
     * Find element by selector or create the floating one.
     */
    getElement(selector: string): HTMLElement {
        let targetEl: HTMLElement;

        if (isPresent(selector)) {
            targetEl = <HTMLElement>document.querySelector(selector);
        }

        if (!isPresent(targetEl)) {
            var floatingElementQuery: HTMLElement = <HTMLElement>document.querySelector(".introjsFloatingElement");

            if (!isPresent(floatingElementQuery)) {
                floatingElementQuery = document.createElement('div');
                floatingElementQuery.className = 'introjsFloatingElement';

                document.body.appendChild(floatingElementQuery);
            }

            targetEl = floatingElementQuery;
        }

        return targetEl;
    }

    private findStepsForElement(targetEl: HTMLElement): IntroStep[] {
        let introItems: IntroStep[] = [];

        //use steps from data-* annotations
        var allIntroSteps: NodeListOf<HTMLElement> = <NodeListOf<HTMLElement>>targetEl.querySelectorAll('*[ng2-intro]');
        if (allIntroSteps.length > 0) {
            this.addStepsWithNumbers(introItems, allIntroSteps);
            this.addStepsWithoutNumbers(introItems, allIntroSteps);
            introItems = this.normalizeSteps(introItems);
            this.sortSteps(introItems);
        }

        return introItems;
    }

    private addStepsWithNumbers(introItems: IntroStep[], allIntroSteps: NodeListOf<HTMLElement>) {
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
                    position: currentElement.getAttribute('data-position') || this.config.tooltipPosition
                };
            }
        }
    }

    private addStepsWithoutNumbers(introItems: IntroStep[], allIntroSteps: NodeListOf<HTMLElement>) {
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
                    position: currentElement.getAttribute('data-position') || this.config.tooltipPosition
                };
            }
        }
    }

    normalizeSteps(introItems: IntroStep[]): IntroStep[] {
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

    sortSteps(introItems: IntroStep[]) {
        introItems.sort((a: IntroStep, b: IntroStep): number => {
            return a.step - b.step;
        });
    }

    /**********************/

    private show(introItems: IntroStep[]) {

    }

}