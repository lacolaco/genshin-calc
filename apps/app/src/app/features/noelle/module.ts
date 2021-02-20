import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiCalculatorNavModule } from '@genshin-calc/ui';
import { CharacterStore } from './character-state';
import { NoelleContainerComponent } from './container.component';
import { NoelleSweepingTimeAttackModule } from './sweeping-time/module';
import { NoelleRoutingModule } from './routing.module';

@NgModule({
  declarations: [NoelleContainerComponent],
  imports: [NoelleRoutingModule, CommonModule, UiCalculatorNavModule, NoelleSweepingTimeAttackModule],
  providers: [CharacterStore],
})
export class NoelleModule {}
