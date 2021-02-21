import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CalculatedDamage } from '@genshin-calc/core';

@Component({
  selector: 'ui-calculation-results',
  templateUrl: './calculation-results.component.html',
  styleUrls: ['./calculation-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculationResultsComponent {
  @Input()
  calculatedDamage!: CalculatedDamage;

  @Input() element?: 'geo' | 'cryo' | 'electro' | 'anemo' | 'physical';

  get textColor() {
    switch (this.element) {
      case 'geo': {
        return 'text-yellow-500';
      }
      case 'cryo': {
        return 'text-blue-300';
      }
      case 'anemo': {
        return 'text-green-300';
      }
      case 'electro': {
        return 'text-purple-700';
      }
      case 'physical': {
        return 'text-gray-700';
      }
      default: {
        return '';
      }
    }
  }
}
