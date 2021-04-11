import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ProductsComponent } from './components/products/products.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { DistributionMarketComponent } from './components/distribution-market/distribution-market.component';
import { ShippingPolicyComponent } from './components/shipping-policy/shipping-policy.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map