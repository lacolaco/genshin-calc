import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GanyuContainerComponent } from './container/container.component';
import { GanyuLiutianArcheryModule } from './liutian-archery/module';
import { GanyuRoutingModule } from './routing.module';

@NgModule({
  declarations: [GanyuContainerComponent],
  imports: [GanyuRoutingModule, CommonModule, GanyuLiutianArcheryModule],
})
export class GanyuModule {}
