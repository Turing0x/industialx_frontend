export interface Product {
  _id: string;
  name: string;
  cantToBuy?: number;
  description: string;
  price: number;
  photo: string;
  offer: number;
}
