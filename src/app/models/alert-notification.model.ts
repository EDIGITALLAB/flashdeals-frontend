export interface AlertNotification {
  id: number;
  title: string;
  message: string;
  timeString: string;
  icon: string;
  colorClass: string;
  routeLink: string;
  queryParams?: any;
}
