import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ConfigService } from '@tour/lib-common';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    ToastModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    MessageService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: ConfigService.ConfigInitialize,
      deps: [ConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
