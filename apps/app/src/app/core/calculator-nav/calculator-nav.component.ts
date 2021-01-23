import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calculator-nav',
  templateUrl: './calculator-nav.component.html',
  styleUrls: ['./calculator-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorNavComponent {}
