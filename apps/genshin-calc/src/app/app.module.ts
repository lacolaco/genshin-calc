import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ZhongliBurstModule } from './features/zhongli-burst/zhongli-burst.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ZhongliBurstModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
