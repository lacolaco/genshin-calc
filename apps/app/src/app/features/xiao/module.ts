import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiCalculatorNavModule } from '@genshin-calc/ui';
import { CharacterStore } from './character-state';
import { XiaoContainerComponent } from './container.component';
import { NoelleSweepingTimeAttackModule } from './lemniscatic-wind-cycling/module';
import { XiaoRoutingModule } from './routing.module';

@NgModule({
  declarations: [XiaoContainerComponent],
  imports: [XiaoRoutingModule, CommonModule, UiCalculatorNavModule, NoelleSweepingTimeAttackModule],
  providers: [CharacterStore],
})
export class XiaoModule {}
