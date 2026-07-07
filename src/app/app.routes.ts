import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Explore } from './pages/explore/explore';
import { DealDetails } from './pages/deal-details/deal-details';
import { Profile } from './pages/profile/profile';
import { MyDealsFollowups } from './pages/my-deals-followups/my-deals-followups';
import { MyInterests } from './pages/my-interests/my-interests';
import { EarlyAccess } from './pages/early-access/early-access';
import { Notifications } from './pages/notifications/notifications';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'explore', component: Explore },
  { path: 'deal-details', component: DealDetails },
  { path: 'profile', component: Profile },
  { path: 'my-deals', component: MyDealsFollowups },
  { path: 'my-interests', component: MyInterests },
  { path: 'early-access', component: EarlyAccess },
  { path: 'notifications', component: Notifications }
];

