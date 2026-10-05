import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Explore } from './pages/explore/explore';
import { DealDetails } from './pages/deal-details/deal-details';
import { Profile } from './pages/profile/profile';
import { MyDealsFollowups } from './pages/my-deals-followups/my-deals-followups';
import { MyInterests } from './pages/my-interests/my-interests';
import { EarlyAccess } from './pages/early-access/early-access';
import { Notifications } from './pages/notifications/notifications';
import { AdminAddDeal } from './pages/admin/admin-add-deal/admin-add-deal';
import { AdminLogin } from './pages/admin/admin-login/admin-login';
import { AdminRegister } from './pages/admin/admin-register/admin-register';
import { SellerRegister } from './pages/admin/seller-register/seller-register';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminBrands } from './pages/admin/admin-brands/admin-brands';
import { AdminCategories } from './pages/admin/admin-categories/admin-categories';
import { AdminManageDeals } from './pages/admin/admin-manage-deals/admin-manage-deals';
import { AdminScheduledDeals } from './pages/admin/admin-scheduled-deals/admin-scheduled-deals';
import { AdminDealAnalytics } from './pages/admin/admin-deal-analytics/admin-deal-analytics';
import { AdminAnnouncements } from './pages/admin/admin-announcements/admin-announcements';
import { AdminNotifications } from './pages/admin/admin-notifications/admin-notifications';
import { AdminUsers } from './pages/admin/admin-users/admin-users';
import { AdminSettings } from './pages/admin/admin-settings/admin-settings';

import { AdminLayout } from './pages/admin/admin-layout/admin-layout';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'explore', component: Explore },
  { path: 'deal-details', component: DealDetails },
  { path: 'profile', component: Profile },
  { path: 'my-deals', component: MyDealsFollowups },
  { path: 'my-interests', component: MyInterests },
  { path: 'early-access', component: EarlyAccess },
  { path: 'notifications', component: Notifications },

  // Admin Portal Routes
  { path: 'admin/login', component: AdminLogin },
  { path: 'admin/register', component: AdminRegister },
  { path: 'register', component: AdminRegister },
  { path: 'admin/seller-register', component: SellerRegister },
  { path: 'seller/register', component: SellerRegister },
  {
    path: 'admin',
    component: AdminLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboard },
      { path: 'brands', component: AdminBrands },
      { path: 'categories', component: AdminCategories },
      { path: 'add-deal', component: AdminAddDeal },
      { path: 'manage-deals', component: AdminManageDeals },
      { path: 'scheduled-deals', component: AdminScheduledDeals },
      { path: 'deal-analytics', component: AdminDealAnalytics },
      { path: 'announcements', component: AdminAnnouncements },
      { path: 'notifications', component: AdminNotifications },
      { path: 'users', component: AdminUsers },
      { path: 'settings', component: AdminSettings }
    ]
  },
  { path: 'admin-add-deal', redirectTo: 'admin/add-deal', pathMatch: 'full' }
];
