import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlbedoTransientBlossomsContainerComponent } from './features/albedo-transient-brossoms/container/container.component';
import { ContainerComponent as FischlNightriderOzContainer } from './features/fischl-nightrider-oz/container/container.component';
import { GanyuLiutianArcheryContainerComponent } from './features/ganyu-liutian-archery/container/container.component';
import { ContainerComponent as XinyanRiffRevolutionContainer } from './features/xinyan-riff-revolution/container/container.component';
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
          path: 'xinyan-riff-revolution',
          component: XinyanRiffRevolutionContainer,
        },
        {
          path: 'fischl-nightrider-oz',
          component: FischlNightriderOzContainer,
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
