import { ChangeDetectionStrategy, Component } from '@angular/core';
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
      name: '鍾離',
      path: '/zhongli-planet-befall',
      thumbnailUrl: '/assets/images/characters/zhongli.png',
    },
    {
      name: '甘雨',
      path: '/ganyu',
      thumbnailUrl: '/assets/images/characters/ganyu.png',
    },
    {
      name: 'アルベド',
      path: '/albedo-transient-blossoms',
      thumbnailUrl: '/assets/images/characters/albedo.png',
    },
    {
      name: 'フィッシュル',
      path: '/fischl-nightrider-oz',
      thumbnailUrl: '/assets/images/characters/fischl.png',
    },
    {
      name: 'レザー',
      path: '/razor-steel-fang',
      thumbnailUrl: '/assets/images/characters/razor.png',
    },
    {
      name: '辛炎',
      path: '/xinyan-riff-revolution',
      thumbnailUrl: '/assets/images/characters/xinyan.png',
    },
    {
      name: 'ノエル',
      path: '/noelle',
      thumbnailUrl: '/assets/images/characters/noelle.png',
    },
  ];
}
