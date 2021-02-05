import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GanyuContainerComponent } from './container.component';
import { GanyuLiutianArcheryContainerComponent } from './liutian-archery/container/container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GanyuContainerComponent,
        children: [
          {
            path: 'liutian-archery',
            component: GanyuLiutianArcheryContainerComponent,
          },
          {
            path: '**',
            redirectTo: 'liutian-archery',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class GanyuRoutingModule {}
