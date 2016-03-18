// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {isPresent} from 'angular2/src/facade/lang';
import {Injectable} from 'angular2/core';

import {Intro} from './intro.directive';
import {Overlay} from './intro.overlay';

import {IntroOptions/*, IntroConfig*/, IntroStep} from './intro.config';
import {checkSteps, getElement, findStepsForElement} from './intro.steps.helper';

@Injectable()
export class IntroService {

    constructor(/*private config: IntroConfig*/) { }

    /**
     * We can start show through the steps or find root element of the show.
     */
    // start(steps: IntroStep[] = null, selector: string = null) {
    start(options:IntroOptions, selector: string = null) {
        let introItems: IntroStep[];

        let targetElm:HTMLElement = getElement(selector);
        if (!isPresent(targetElm)) {
            // Use BODY element if original element was not found by selector
            targetElm = document.body;
        }

        if (isPresent(options.steps)) {
            introItems = checkSteps(steps);
        } else if (isPresent(selector)) {
            introItems = findStepsForElement(targetElm, this.config);
        } else {
            throw new Error('Selector or steps must be provided');
        }
        // Start show
        this.show(introItems, targetElm);
    }

    /**********************/

    private show(introItems: IntroStep[], targetElm:HTMLElement) {
        var overlayLayer = document.createElement('ng2-intro-overlay');

    }

}