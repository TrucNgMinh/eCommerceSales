import { Component, Input, forwardRef, Output, Optional, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgForm } from '@angular/forms';
@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextBoxComponent),
    multi: true
  }]
})

export class TextBoxComponent implements ControlValueAccessor {
  value: any;
  @Input()
  title!: string;
  @Input() placeholder = '';
  @Input()
  required!: boolean;
  @Input() type = 'text';
  @Input()
  name!: string;
  @Input()
  disabled!: boolean;

  onChange: (_: any) => void = (_: any) => { };
  onTouched: () => void = () => { };

  constructor(
    @Optional() private ngForm: NgForm
  ) {
  }

  preventEvent(event: any) {
    event.stopPropagation();
  }

  writeValue(value: any): void {
    if (value !== this.value) {
      this.value = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateChanges() {
    this.onChange(this.value);
  }

  invalid() {
    if (!this.ngForm) {
      return false;
    }
    const control = this.ngForm.form.get(this.name);
    
    return control && control.invalid && (control.dirty || this.ngForm.submitted);
  }

  removeZero(value: any) {
    if (this.type === "number") {
      if (value == 0) {
        this.value = '';
      }
    }
  }

  addZero(value: any) {
    if (this.type === "number") {
      if (value == '') {
        this.value = 0;
      }
    }
  }

  valid() {
    if (!this.ngForm) {
      return false;
    }

    const control = this.ngForm.form.get(this.name);
    return control && control.valid && (control.dirty || this.ngForm.submitted);
  }
}
