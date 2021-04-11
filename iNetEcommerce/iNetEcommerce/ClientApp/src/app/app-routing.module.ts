import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { DistributionMarketComponent } from './components/distribution-market/distribution-market.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NewsComponent } from './components/news/news.component';
import { PriceListComponent } from './components/price-list/price-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShippingPolicyComponent } from './components/shipping-policy/shipping-policy.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeUserComponent
      },
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'price-list',
        component: PriceListComponent
      },
      {
        path: 'distribution-market',
        component: DistributionMarketComponent
      },
      {
        path: 'shipping-policy',
        component: ShippingPolicyComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent
      }

    ]
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
    children: [
      // not implement
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
