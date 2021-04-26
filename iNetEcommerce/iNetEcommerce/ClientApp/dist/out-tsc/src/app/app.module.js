import { __decorate } from "tslib";
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
import { MainLayoutAdminComponent } from './components/admin-components/main-layout-admin/main-layout-admin.component';
import { AdminProductComponent } from './components/admin-components/products/admin-product/admin-product.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BaseService } from './services/common/base.service';
import { ErrorService } from './services/common/error.service';
import { GlobalService } from './services/global.service';
import { AdminProductGroupComponent } from './components/admin-components/products/admin-product-group/admin-product-group.component';
import { AdminProductDetailComponent } from './components/admin-components/products/admin-product-detail/admin-product-detail.component';
import { TextBoxComponent } from './controls/text-box/text-box.component';
import { InvalidTypeDirective } from './directives/invalid-type.directive';
import { InvalidmessageDirective } from './directives/invalid-message.directive';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            //controls
            TextBoxComponent,
            //Directives
            InvalidTypeDirective,
            InvalidmessageDirective,
            //components
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
            ProductListComponent,
            AdminProductComponent,
            MainLayoutAdminComponent,
            LoginComponent,
            AdminProductGroupComponent,
            AdminProductDetailComponent
        ],
        imports: [
            BrowserModule,
            AppRoutingModule,
            HttpClientModule,
            BrowserAnimationsModule,
            FormsModule,
            DataTablesModule,
            NgbModule
        ],
        providers: [
            ErrorService,
            AuthService,
            BaseService,
            GlobalService
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map