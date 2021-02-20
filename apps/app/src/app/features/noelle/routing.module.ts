import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoelleContainerComponent as NoelleContainerComponent } from './container.component';
import { FormContainerComponent } from './sweeping-time/container.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: NoelleContainerComponent,
        children: [
          {
            path: 'sweeping-time',
            component: FormContainerComponent,
          },
          {
            path: '**',
            redirectTo: 'sweeping-time',
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class NoelleRoutingModule {}
