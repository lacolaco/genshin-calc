import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GanyuContainerComponent } from './container.component';
import { LiutianArcheryContainerComponent } from './liutian-archery/container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: GanyuContainerComponent,
        children: [
          {
            path: 'liutian-archery',
            component: LiutianArcheryContainerComponent,
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
