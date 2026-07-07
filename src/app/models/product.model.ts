export interface Product {
  id: number;
  name: string;
  category: string;
  store: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  secondsLeft: number;
  timerString?: string;
}
