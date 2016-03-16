// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {Intro} from './intro.directive';
import {IntroOptions, IntroConfig} from './intro.config';

export class IntroService {
    
    _targetElement:HTMLElement;
    _introItems:Intro[] = [];
    
    constructor(private config:IntroConfig) {}
    
    start(selector:string) {
        // Find element with selector
        let targetEl:HTMLElement = <HTMLElement>document.querySelector(selector);
        if (targetEl) {
            
        } else {
            throw new Error('Cannot find element "' + selector + '"');
        }
    }
    
    private introForElement(targetEl:HTMLElement) {
        
    }
    
}