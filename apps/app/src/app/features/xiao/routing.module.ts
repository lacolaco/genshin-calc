import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XiaoContainerComponent } from './container.component';
import { FormContainerComponent as LemniscaticWindCycling } from './lemniscatic-wind-cycling/container.component';
import { FormContainerComponent as PlungingAttack } from './plunging-attack/container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: XiaoContainerComponent,
        children: [
          {
            path: 'lemniscatic-wind-cycling',
            component: LemniscaticWindCycling,
          },
          {
            path: 'plunging-attack',
            component: PlungingAttack,
          },
          {
            path: '**',
            redirectTo: 'plunging-attack',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class XiaoRoutingModule {}
