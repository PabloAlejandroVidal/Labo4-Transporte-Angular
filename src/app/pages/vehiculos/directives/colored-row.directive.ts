import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { Tipo } from '../../../services/transporte.service';

@Directive({
  selector: '[appColoredRow]',
})
export class ColoredRowDirective {
  private overlay: HTMLElement | null = null;
  @Input({required: true}) tipo: Tipo | null | any = null;
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.paintRow();
  }

  paintRow() {
    switch (this.tipo){
      case 'aereo':
      this.renderer.setStyle(this.el.nativeElement, 'background', 'rgb(255, 255, 54)');
      break;
      case 'maritimo':
      this.renderer.setStyle(this.el.nativeElement, 'background', 'rgb(93, 147, 224)');
      break;
      case 'terrestre':
      this.renderer.setStyle(this.el.nativeElement, 'background', 'rgb(118, 201, 63)');
      break;
      case null:{
        break
      }
    }
  }
}
