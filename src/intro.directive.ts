// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {Directive, Input, Output, EventEmitter, OnInit} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {IntroService} from './intro.service';

/**
 * An Intro component.
 */
@Directive({selector: 'ng2-intro'})
export class Intro implements OnInit {
    
    private _intro:string;
    @Input('ng2-intro') set intro(value:string) {
        this._intro = value;
    }
    get intro():string {
        return this._intro;
    }
    
    constructor(private service:IntroService) {}
    
    ngOnInit(): any {
        // Register component in service
    }
}
