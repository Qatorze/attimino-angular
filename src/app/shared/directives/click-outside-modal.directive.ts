import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
  } from '@angular/core';
  
  @Directive({
    selector: '[appClickOutsideModal]',
    standalone: false,
  })
  export class ClickOutsideModalDirective {
    // Événement qui sera déclenché lorsque l'utilisateur clique à l'extérieur
    @Output() clickOutside = new EventEmitter<void>();
  
    constructor(private el: ElementRef) {}
  
    @HostListener('document:click', ['$event.target'])
    onClick(targetElement: HTMLElement): void {
      const clickedInside = this.el.nativeElement.contains(targetElement);
      if (!clickedInside) {
        this.clickOutside.emit();
      }
    }
  }
  