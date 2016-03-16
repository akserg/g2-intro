// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {Intro} from './intro.directive';
import {IntroOptions, IntroConfig, IntroStep} from './intro.config';

export class IntroService {
    
    private _targetElement:HTMLElement;
    private _introItems:Intro[] = [];
    
    constructor(private config:IntroConfig) {}
    
    /**
     * Start the introduction for defined selector.
     */
    startWithElement(selector:string = null) {
        let targetEl:HTMLElement;
        if (selector) {
            // Find element with selector
            targetEl = <HTMLElement>document.querySelector(selector);
            if (targetEl) {
                this.introForElement(targetEl);
            } else {
                throw new Error('Cannot find element "' + selector + '"');
            }
        } else {
            // Find any first element marked with ng2-intro directive
            targetEl = <HTMLElement>document.querySelector('[ng2-intro]');
            if (targetEl) {
                this.introForElement(targetEl);
            } else {
                throw new Error('Cannot find element marked with "ng2-intro"');
            }
        }
    }
    
    startWithSteps(steps:IntroStep[]) {

    //use steps passed programmatically
      for (var i = 0, stepsLength = steps.length; i < stepsLength; i++) {
        var currentItem:IntroStep = steps[i]; //_cloneObject(steps[i]);
        //set the step
        currentItem.step = this._introItems.length + 1;
        //use querySelector function only when developer used CSS selector
        if (typeof(currentItem.element) === 'string') {
          //grab the element with given selector from the page
          currentItem.element = document.querySelector(currentItem.element);
        }

        //intro without element
        if (typeof(currentItem.element) === 'undefined' || currentItem.element == null) {
          var floatingElementQuery = document.querySelector(".introjsFloatingElement");

          if (floatingElementQuery == null) {
            floatingElementQuery = document.createElement('div');
            floatingElementQuery.className = 'introjsFloatingElement';

            document.body.appendChild(floatingElementQuery);
          }

          currentItem.element  = floatingElementQuery;
          currentItem.position = 'floating';
        }

        if (currentItem.element != null) {
          introItems.push(currentItem);
        }
      }
        
        
    }
    
    private introForElement(targetEl:HTMLElement) {
        
    }
    
}