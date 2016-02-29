// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

/**
 * An Intro component.
 */
@Component({
    selector: 'ng2-intro',
    directives: [CORE_DIRECTIVES],
    template: `<div></div>`
})
export class Intro {

}
