import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiCalculatorNavModule } from '@genshin-calc/ui';
import { GanyuCelestialShowerModule } from './celestial-shower/module';
import { CharacterStore } from './character-state';
import { GanyuContainerComponent } from './container.component';
import { GanyuLiutianArcheryModule } from './liutian-archery/module';
import { GanyuRoutingModule } from './routing.module';

@NgModule({
  declarations: [GanyuContainerComponent],
  imports: [
    GanyuRoutingModule,
    CommonModule,
    UiCalculatorNavModule,
    GanyuLiutianArcheryModule,
    GanyuCelestialShowerModule,
  ],
  providers: [CharacterStore],
})
export class GanyuModule {}
