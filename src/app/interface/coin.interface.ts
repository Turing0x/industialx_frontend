export interface CoinPrices {
  status:      number;
  api_message: string;
  data:        Prices[];
}

export interface Prices {
  mlc:  number;
  usd:  number;
  euro: number;
}
