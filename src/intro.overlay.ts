// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {Component, Input, Output, EventEmitter, OnInit, ElementRef} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {IntroService} from './intro.service';

/**
 * An Intro component.
 */
@Component({
    selector: 'ng2-intro-overlay',
    template: `
<div class="introjs-overlay">
</div>`
})
export class Overlay implements OnInit {

    element: HTMLElement;

    @Input() exitOnOverlayClick: boolean = false;
    @Input() overlayOpacity:string = '';

    @Output() exit: EventEmitter<any> = new EventEmitter<any>();

    constructor(private service: IntroService, private elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    ngOnInit(): any {
        let styleText: string = '';
        let parent: HTMLElement = this.element.parentElement;
        // Check what the parent component we hav
        if (parent.tagName.toLowerCase() === 'body') {
            // Overlay embedded into the body
            styleText += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
            this.element.setAttribute('style', styleText);
        } else {
            // Overlay embedded into the child of body
            var elementPosition = this._getOffset(parent);
            if (elementPosition) {
                styleText += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
                this.element.setAttribute('style', styleText);
            }
        }
        // Add click event listener to overlay's element
        this.element.onclick = (event: MouseEvent) => {
            if (this.exitOnOverlayClick) {
                // Fire event 'exit'
                this.exit.emit(null);
            }
        };
        // Let's dim overlay
        styleText += 'opacity: ' + this.overlayOpacity + ';';
        this.element.setAttribute('style', styleText);
    }

    /**
     * Get an element position on the page
     */
    _getOffset(element: HTMLElement) {
        var elementPosition: any = {};

        //set width
        elementPosition.width = element.offsetWidth;

        //set height
        elementPosition.height = element.offsetHeight;

        //calculate element top and left
        var _x = 0;
        var _y = 0;
        while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
            _x += element.offsetLeft;
            _y += element.offsetTop;
            element = <HTMLElement>element.offsetParent;
        }
        //set top
        elementPosition.top = _y;
        //set left
        elementPosition.left = _x;

        return elementPosition;
    }
}
