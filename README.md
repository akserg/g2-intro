# ng2-intro [![Build Status](https://travis-ci.org/akserg/ng2-intro.svg?branch=master)](https://travis-ci.org/akserg/ng2-intro) [![npm version](https://img.shields.io/npm/v/ng2-intro.svg)](https://www.npmjs.com/package/ng2-intro) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
Introductions for websites and features with a step-by-step guide for Angular 2 projects.

## Installation
First you need to install the npm module:
```sh
npm install ng2-intro --save
```

If you use SystemJS to load your files, you might have to update your config with this if you don't use `defaultJSExtensions: true`:
```js
System.config({
    packages: {
        "/ng2-intro": {"defaultExtension": "js"}
    }
});
```

Finally, you can use *ng2-intro* in your Angular 2 project:
- Import `IntroService, IntroConfig, Intro, IntroOptions` from `ng2-intro/ng2-intro`
- Instantiate `IntroService, IntroConfig` in the bootstrap of your application;
- Add `Intro` to the "directives" property of your application component;
- Add `<ng2-intro></ng2-intro>` tag in template of your application component.

```js
import {Component} from 'angular2/core';
import {IntroService, IntroConfig, Intro, ToastOptions, ToastData} from 'ng2-intro/ng2-intro';
import {bootstrap} from 'angular2/platform/browser';

bootstrap(AppComponent, [
    IntroService, IntroConfig // It is required to have 1 unique instance of your service
]);

@Component({
    selector: 'app',
    directives: [Intro],
    template: `
        <div>Hello world</div>
        <button (click)="addToast()">Add Toast</button>
        <ng2-intro></ng2-intro>
    `
})
export class AppComponent {
    
    constructor(private introService:IntroService) { }
    
    addToast() {
        // Just add default Toast with title only
        this.introService.default('Hi there');
        // Or create the instance of ToastOptions
        var toastOptions:ToastOptions = {
            title: "My title",
            msg: "The message",
            showClose: true,
            timeout: 5000,
            theme: 'default'
            onAdd: (toast:ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast:ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };
        // Add see all possible types in one shot
        this.introService.info(toastOptions);
        this.introService.success(toastOptions);
        this.introService.wait(toastOptions);
        this.introService.error(toastOptions);
        this.introService.warning(toastOptions);
    }
}
```

Inspired by [Intro.js](https://github.com/usablica/intro.js.git)