import { Input, Directive, ElementRef, Renderer2, HostListener } from '@angular/core';


@Directive({
    selector: '[errorDirective]',

})
export class PrintErrorDirective {
    @Input() formControlItem: any;
    @Input() placeholder: string = '';
    @Input() isError: any;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }
    @HostListener('cut', ['$event']) cut(event: ClipboardEvent) {
        this.renderer.addClass(this.el.nativeElement, 'has-error');
    }
    @HostListener('focusout', ['$event']) focusout(event: FocusEvent) {
        event.preventDefault();
        if (this.formControlItem.invalid) {
            this.renderer.addClass(this.el.nativeElement, 'has-error');
        }
        else {
            this.renderer.removeClass(this.el.nativeElement, 'has-error');
        }
    }
    @HostListener('keyup', ['$event']) keyup(event: Event) {
        if (this.formControlItem.valid) {
            this.renderer.removeClass(this.el.nativeElement, 'has-error');
        }
        else {
            this.renderer.addClass(this.el.nativeElement, 'has-error');
        }
    }
}