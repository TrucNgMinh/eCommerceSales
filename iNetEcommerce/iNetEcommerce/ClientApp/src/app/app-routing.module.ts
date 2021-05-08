import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/user-components/contact/contact.component';
import { DistributionMarketComponent } from './components/user-components/distribution-market/distribution-market.component';
import { HomeAdminComponent } from './components/admin-components/home-admin/home-admin.component';
import { ProductListComponent } from './components/user-components/product-list/product-list.component';
import { ShippingPolicyComponent } from './components/user-components/shipping-policy/shipping-policy.component';
import { HomeUserComponent } from './components/user-components/home-user/home-user.component';
import { MainLayoutComponent } from './components/user-components/main-layout/main-layout.component';
import { NewsComponent } from './components/user-components/news/news.component';
import { PriceListComponent } from './components/user-components/price-list/price-list.component';
import { ProductDetailComponent } from './components/user-components/product-detail/product-detail.component';
import { MainLayoutAdminComponent } from './components/admin-components/main-layout-admin/main-layout-admin.component';
import { AdminProductComponent } from './components/admin-components/products/admin-product/admin-product.component';
import { LoginComponent } from './components/login/login.component';
import { AdminProductGroupComponent } from './components/admin-components/products/admin-product-group/admin-product-group.component';
import { AdminProductDetailComponent } from './components/admin-components/products/admin-product-detail/admin-product-detail.component';
import { NewsAdminComponent } from './components/admin-components/news/news-admin/news-admin.component';
import { NewsDetailComponent } from './components/admin-components/news/news-detail/news-detail.component';

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
    component: MainLayoutAdminComponent,
    children: [
      {
        path: '',
        component: HomeAdminComponent,
      }, {
        path: 'admin-product',
        component: AdminProductComponent
      }
      , {
        path: 'admin-product-group',
        component: AdminProductGroupComponent
      }
      , {
        path: 'admin-product-detail',
        component: AdminProductDetailComponent
      },
      {
        path: 'admin-news',
        component: NewsAdminComponent
      },
      {
        path:'admin-news-detail',
        component: NewsDetailComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
