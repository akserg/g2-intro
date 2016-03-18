import {Component, Input, Output, EventEmitter, ElementRef} from 'angular2/core';

export function triggerEvent(elem:HTMLElement, eventName:string, eventType:string) {
    var event:Event = document.createEvent(eventType);
    event.initEvent(eventName, true, true);
    elem.dispatchEvent(event);
}

@Component({
  selector: 'container',
  template: `
      <div class="jumbotron">
        <h1 id="step1">Programmatic</h1>
        <p id="step4" class="lead">In this example we are going to define steps with JSON configuration.</p>
        <a class="btn btn-large btn-success" href="javascript:void(0);" (click)="startIntro($event);">Show me how</a>
      </div>

      <hr>

      <div class="row-fluid marketing">
        <div id="step2" class="span6">
          <h4>Section One</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>

          <h4>Section Two</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>

          <h4>Section Three</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>
        </div>

        <div id="step3" class="span6">
          <h4>Section Four</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>


          <h4>Section Five</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>

          <h4>Section Six</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis augue a neque cursus ac blandit orci faucibus. Phasellus nec metus purus.</p>
        </div>
      </div>
`,
  directives: []
})
export class ContainerWithSteps {
    @Output() start:EventEmitter<any> = new EventEmitter<any>();

    private startIntro($event:any) {
        this.start.emit($event);
    }
}
