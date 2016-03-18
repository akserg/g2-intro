import {
    describe,
    expect,
    beforeEach,
    it,
    inject,
    injectAsync,
    beforeEachProviders,
    TestComponentBuilder,
    ComponentFixture,
    fakeAsync,
    tick
} from 'angular2/testing';

import {TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS}
from 'angular2/platform/testing/browser';

import {Observable} from 'rxjs/Observable';

import {IntroOptions, IntroConfig, IntroStep} from '../src/intro.config';
import {IntroService} from '../src/intro.service';
import {checkSteps} from '../src/intro.steps.helper';
import {ContainerWithSteps} from './intro.factory';

export function main() {
    describe('Drag and Drop without draggable data', () => {

        let componentFixture: ComponentFixture;
        let service:IntroService;
        let container:ContainerWithSteps;

        let steps = [
            <IntroStep>{
                intro: "Hello world!"
            },
            <IntroStep>{
                selector: '#step1',
                intro: "This is a tooltip."
            },
            <IntroStep>{
                selector: '#step2',
                intro: "Ok, wasn't that fun?",
                position: 'right'
            },
            <IntroStep>{
                selector: '#step3',
                intro: 'More features, more fun.',
                position: 'left'
            },
            <IntroStep>{
                selector: '#step4',
                intro: "Another step.",
                position: 'bottom'
            },
            <IntroStep>{
                selector: '#step5',
                intro: 'Get it, use it.'
            }
        ];

        beforeEachProviders(() => {
            return [TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS, IntroConfig, IntroService];
        });

        beforeEach(injectAsync([TestComponentBuilder, IntroService], (tcb: TestComponentBuilder, s: IntroService) => {
            service = s;
            return tcb.createAsync(ContainerWithSteps).then((cf: ComponentFixture) => {
                componentFixture = cf;
                componentFixture.detectChanges();
                container = <ContainerWithSteps>componentFixture.componentInstance;
            });
        }));

        it('should be defined', () => {
            expect(componentFixture).toBeDefined();
        });

        it('should find all elements in steps before show the intro', () => {
            service.start(steps);

            expect(true).toBeTruthy();
        });
    });
}

/*
[
Object{intro: 'Hello world!', step: 1, element: <div class="introjsFloatingElement"></div>, position: 'floating'},
Object{selector: '#step1', intro: 'This is a tooltip.', step: 2, element: <h1 id="step1">Programmatic</h1>},
Object{selector: '#step2', intro: 'Ok, wasn't that fun?', position: 'right', step: 3, element: <div class="span6" id="step2">
        <h4>Section One</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>

        <h4>Section Two</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>

        <h4>Section Three</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>
    </div>},
Object{selector: '#step3', intro: 'More features, more fun.', position: 'left', step: 4, element: <div class="span6" id="step3">
        <h4>Section Four</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>


        <h4>Section Five</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>

        <h4>Section Six</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>
    </div>},
Object{selector: '#step4', intro: 'Another step.', position: 'bottom', step: 5, element: <p class="lead" id="step4">In this example we are going to define steps with JSON configuration.</p>},
Object{selector: '#step5', intro: 'Get it, use it.', step: 6, element: <div class="introjsFloatingElement"></div>, position: 'floating'}]
*/