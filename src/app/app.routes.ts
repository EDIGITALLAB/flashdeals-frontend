import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Explore } from './pages/explore/explore';
import { DealDetails } from './pages/deal-details/deal-details';
import { Profile } from './pages/profile/profile';
import { MyDealsFollowups } from './pages/my-deals-followups/my-deals-followups';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'explore', component: Explore },
  { path: 'deal-details', component: DealDetails },
  { path: 'profile', component: Profile },
  { path: 'my-deals', component: MyDealsFollowups }
];

