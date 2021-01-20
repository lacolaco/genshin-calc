import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-control-label',
  templateUrl: './control-label.component.html',
  styleUrls: ['./control-label.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlLabelComponent {}
