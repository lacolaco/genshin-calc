import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AlbedoTransientBlossomsModule } from './features/albedo-transient-brossoms/module';
import { ZhongliPlanetBefallModule } from './features/zhongli-planet-befall/module';
import { GanyuLiutianArcheryModule } from './features/ganyu-liutian-archery/module';
import { XinyanRiffRevolutionModule } from './features/xinyan-riff-revolution/module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
    CoreModule,
    ZhongliPlanetBefallModule,
    AlbedoTransientBlossomsModule,
    GanyuLiutianArcheryModule,
    XinyanRiffRevolutionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
