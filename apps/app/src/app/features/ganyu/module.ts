import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UiCharacterNavModule } from '@genshin-calc/ui';
import { GanyuCelestialShowerModule } from './celestial-shower/module';
import { GanyuContainerComponent } from './container.component';
import { GanyuLiutianArcheryModule } from './liutian-archery/module';
import { GanyuRoutingModule } from './routing.module';

@NgModule({
  declarations: [GanyuContainerComponent],
  imports: [
    GanyuRoutingModule,
    CommonModule,
    UiCharacterNavModule,
    GanyuLiutianArcheryModule,
    GanyuCelestialShowerModule,
  ],
})
export class GanyuModule {}
