import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        component: ContainerComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class FischlRoutingModule {}
