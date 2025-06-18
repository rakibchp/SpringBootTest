import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyLetters]'
})
export class OnlyLettersDirective {
  private previousValue = '';

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    const originalValue = input.value;

    // Allow letters and spaces only
    let cleaned = originalValue.replace(/[^a-zA-Z ]/g, '');

    // Capitalize first letter of each word
    cleaned = cleaned
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    // Avoid infinite loop
    if (cleaned !== originalValue) {
      input.value = cleaned;
      input.dispatchEvent(new Event('input'));
    }

    this.previousValue = cleaned;
  }
}
