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
import { XinyanRiffRevolutionModule } from './features/xinyan-riff-revolution/module';
import { FischlNightriderOzModule } from './features/fischl-nightrider-oz/module';
import { RazorSteelFangModule } from './features/razor-steel-fang/module';
import { BasicAttackModule } from './features/basic-attack/module';
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
    XinyanRiffRevolutionModule,
    FischlNightriderOzModule,
    RazorSteelFangModule,
    BasicAttackModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
