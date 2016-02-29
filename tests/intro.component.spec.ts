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

import {Intro} from 'intro.component';

export function main() {
    describe('ToastyComponent', () => {


        beforeEachProviders(() => {
            return [TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS];
        });


         beforeEach(injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
            return tcb.createAsync(Intro).then((cf:ComponentFixture) => {
                componentFixture = cf;
                componentFixture.detectChanges();
            });
        }));

        it('should be defined', () => {
            const element = componentFixture.nativeElement;
            expect(element).toBeDefined();
        });
    });
}