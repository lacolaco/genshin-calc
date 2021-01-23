import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlbedoTransientBlossomsContainerComponent } from './features/albedo-transient-brossoms/container/container.component';
import { GanyuLiutianArcheryContainerComponent } from './features/ganyu-liutian-archery/container/container.component';
import { ZhongliPlanetBefallContainerComponent } from './features/zhongli-planet-befall/container/container.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'zhongli-planet-befall',
          component: ZhongliPlanetBefallContainerComponent,
        },
        {
          path: 'ganyu-liutian-archery',
          component: GanyuLiutianArcheryContainerComponent,
        },
        {
          path: 'albedo-transient-blossoms',
          component: AlbedoTransientBlossomsContainerComponent,
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: '/zhongli-planet-befall',
        },
      ],
      {
        scrollPositionRestoration: 'top',
      },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
