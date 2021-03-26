import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { NgxSpinnerModule } from "ngx-spinner";
import { SideDrawerComponent } from "./components/side-drawer/side-drawer.component";
import { JQ_TOKEN } from "./_services/jQuery.service";
import { SideDrawerTriggerDirective } from "./components/side-drawer-trigger.directive";
import { FormsModule } from "@angular/forms";
const jQuery = window["$"];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideDrawerComponent,
    SideDrawerTriggerDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
  ],
  providers: [{ provide: JQ_TOKEN, useValue: jQuery }],
  bootstrap: [AppComponent],
})
export class AppModule {}
