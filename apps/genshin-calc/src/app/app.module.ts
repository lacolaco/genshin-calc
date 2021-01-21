import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AlbedoTransientBlossomsModule } from './features/albedo-transient-brossoms/module';
import { ZhongliPlanetBefallModule } from './features/zhongli-planet-befall/module';
import { GanyuLiutianArcheryModule } from './features/ganyu-liutian-archery/module';

@NgModule({
  declarations: [AppComponent],
  // eslint-disable-next-line max-len
  imports: [BrowserModule, AppRoutingModule, CoreModule, ZhongliPlanetBefallModule, AlbedoTransientBlossomsModule, GanyuLiutianArcheryModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
