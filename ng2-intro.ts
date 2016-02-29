// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-intro

'use strict';

import {Intro} from './src/intro.component';

export * from './src/toasty.component';

export default {
  providers: [ToastyConfig, ToastyService],
  directives: [Toasty, Toast]
}
