import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiCalculatorNavModule } from '@genshin-calc/ui';
import { CharacterStore } from './character-state';
import { XiaoContainerComponent } from './container.component';
import { XiaoLemniscaticWindCyclingModule } from './lemniscatic-wind-cycling/module';
import { XiaoPlungingAttackModule } from './plunging-attack/module';
import { XiaoRoutingModule } from './routing.module';

@NgModule({
  declarations: [XiaoContainerComponent],
  imports: [
    XiaoRoutingModule,
    CommonModule,
    UiCalculatorNavModule,
    XiaoLemniscaticWindCyclingModule,
    XiaoPlungingAttackModule,
  ],
  providers: [CharacterStore],
})
export class XiaoModule {}
