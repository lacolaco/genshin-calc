import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ZhongliPlanetBefallContainerComponent } from './container/container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        component: ZhongliPlanetBefallContainerComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ZhongliRoutingModule {}
