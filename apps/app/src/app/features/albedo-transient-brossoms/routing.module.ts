import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlbedoTransientBlossomsContainerComponent } from './container/container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '**',
        component: AlbedoTransientBlossomsContainerComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AlbedoRoutingModule {}
