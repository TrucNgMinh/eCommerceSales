import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeAdminComponent } from './components/admin-components/home-admin/home-admin.component';
import { ProductsComponent } from './components/user-components/products/products.component';
import { DistributionMarketComponent } from './components/user-components/distribution-market/distribution-market.component';
import { ShippingPolicyComponent } from './components/user-components/shipping-policy/shipping-policy.component';
import { ContactComponent } from './components/user-components/contact/contact.component';
import { ProductListComponent } from './components/user-components/product-list/product-list.component';
import { HomeUserComponent } from './components/user-components/home-user/home-user.component';
import { MainLayoutComponent } from './components/user-components/main-layout/main-layout.component';
import { NewsComponent } from './components/user-components/news/news.component';
import { PriceListComponent } from './components/user-components/price-list/price-list.component';
import { ProductDetailComponent } from './components/user-components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomeAdminComponent,
    HomeUserComponent,
    ProductsComponent,
    PriceListComponent,
    DistributionMarketComponent,
    ShippingPolicyComponent,
    NewsComponent,
    ContactComponent,
    ProductDetailComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
