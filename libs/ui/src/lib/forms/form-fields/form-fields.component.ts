import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldsComponent {}
