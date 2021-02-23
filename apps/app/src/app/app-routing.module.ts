import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'zhongli-planet-befall',
          loadChildren: () =>
            import('./features/zhongli-planet-befall/module').then((m) => m.ZhongliPlanetBefallModule),
        },
        {
          path: 'ganyu',
          loadChildren: () => import('./features/ganyu/module').then((m) => m.GanyuModule),
        },
        {
          path: 'noelle',
          loadChildren: () => import('./features/noelle/module').then((m) => m.NoelleModule),
        },
        {
          path: 'xiao',
          loadChildren: () => import('./features/xiao/module').then((m) => m.XiaoModule),
        },
        {
          path: 'albedo-transient-blossoms',
          loadChildren: () =>
            import('./features/albedo-transient-brossoms/module').then((m) => m.AlbedoTransientBlossomsModule),
        },
        {
          path: 'xinyan-riff-revolution',
          loadChildren: () =>
            import('./features/xinyan-riff-revolution/module').then((m) => m.XinyanRiffRevolutionModule),
        },
        {
          path: 'fischl-nightrider-oz',
          loadChildren: () => import('./features/fischl-nightrider-oz/module').then((m) => m.FischlNightriderOzModule),
        },
        {
          path: 'razor-steel-fang',
          loadChildren: () => import('./features/razor-steel-fang/module').then((m) => m.RazorSteelFangModule),
        },
        {
          path: 'basic-attack',
          loadChildren: () => import('./features/basic-attack/module').then((m) => m.BasicAttackModule),
        },
        {
          path: '**',
          redirectTo: '/',
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
