import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ZhongliBurstContainerComponent } from './features/zhongli-burst/zhongli-burst-container/zhongli-burst-container.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'zhongli-burst',
        component: ZhongliBurstContainerComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/zhongli-burst',
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
