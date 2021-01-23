import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ControlLabelComponent } from '../control-label/control-label.component';
import { TalentLevelSelectComponent } from './talent-level-select.component';

describe('TalentLevelSelectComponent', () => {
  let spectator: Spectator<TalentLevelSelectComponent>;
  const createComponent = createComponentFactory({
    component: TalentLevelSelectComponent,
    declarations: [ControlLabelComponent],
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  test('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('天賦レベルを選択できる', () => {
    test('1から15までのoption要素を表示する', () => {
      const options = spectator.queryAll('option');

      expect(options.map((el) => el.textContent)).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
      ]);
    });
  });
});
