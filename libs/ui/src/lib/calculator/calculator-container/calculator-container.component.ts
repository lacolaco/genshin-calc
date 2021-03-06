import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ElementType } from '@genshin-calc/core';

@Component({
  selector: 'ui-calculator-title',
  template: `<ng-content></ng-content>`,
})
export class CalculatorTitleComponent {}

@Component({
  selector: 'ui-calculator-description',
  template: `<ng-content></ng-content>`,
})
export class CalculatorDescriptionComponent {}

@Component({
  selector: 'ui-calculator-container',
  templateUrl: './calculator-container.component.html',
  styleUrls: ['./calculator-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorContainerComponent {
  @Input()
  elementType!: ElementType;
}
