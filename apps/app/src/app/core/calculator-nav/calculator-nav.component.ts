import { ChangeDetectionStrategy, Component } from '@angular/core';
import { characters } from '@genshin-calc/core';
import { CharacterNavItem } from '@genshin-calc/ui';

@Component({
  selector: 'app-calculator-nav',
  templateUrl: './calculator-nav.component.html',
  styleUrls: ['./calculator-nav.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorNavComponent {
  readonly characters: CharacterNavItem[] = [
    {
      path: '/zhongli-planet-befall',
      ...characters.zhongli,
    },
    {
      path: '/ganyu',
      ...characters.ganyu,
    },
    {
      path: '/albedo-transient-blossoms',
      ...characters.albedo,
    },
    {
      path: '/fischl-nightrider-oz',
      ...characters.fischl,
    },
    {
      path: '/razor-steel-fang',
      ...characters.razor,
    },
    {
      path: '/xinyan-riff-revolution',
      ...characters.xinyan,
    },
    {
      path: '/noelle',
      ...characters.noelle,
    },
    {
      path: '/xiao',
      ...characters.xiao,
    },
    {
      path: '/ningguang',
      ...characters.ningguang,
      hidden: true,
    },
    {
      path: '/diluc',
      ...characters.diluc,
      hidden: true,
    },
  ];
}
