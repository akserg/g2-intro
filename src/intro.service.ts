// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {isPresent} from 'angular2/src/facade/lang';

import {Intro} from './intro.directive';
import {IntroOptions, IntroConfig, IntroStep} from './intro.config';
import {checkSteps, findStepsFromSelector} from './intro.step.helper';

export class IntroService {

    constructor(private config: IntroConfig) { }

    start(steps: IntroStep[] = null, selector: string = null) {
        let introItems: IntroStep[];

        if (isPresent(steps)) {
            introItems = checkSteps(steps);
        } else if (isPresent(selector)) {
            introItems = findStepsFromSelector(selector);
        } else {
            throw new Error('Selector or steps must be provided');
        }
        // Start show
        this.show(introItems);
    }

    /**********************/

    private show(introItems: IntroStep[]) {

    }

}