import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XiaoContainerComponent as XiaoContainerComponent } from './container.component';
import { FormContainerComponent } from './lemniscatic-wind-cycling/container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: XiaoContainerComponent,
        children: [
          {
            path: 'lemniscatic-wind-cycling',
            component: FormContainerComponent,
          },
          {
            path: '**',
            redirectTo: 'lemniscatic-wind-cycling',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class XiaoRoutingModule {}
