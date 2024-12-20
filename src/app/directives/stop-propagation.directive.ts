import { Directive, ElementRef, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appStopPropagation]',
})
export class StopPropagationDirective {

  @Input() stopPropagation = true;
  @Input() preventDefault = false;
  constructor() {}

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.preventDefault){
      event.preventDefault();
    }
    if (this.stopPropagation){
      event.stopPropagation();
    }
  }
}
