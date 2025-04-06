
export interface StockData {
  symbol: string;      // Stock symbol (e.g., "RELIANCE.NS")
  name: string;        // Company name
  sector: string;      // Industry sector
  change: number;      // Percentage change in price
  marketCap: number;   // Market capitalization in billions
  price: number;       // Current stock price
  volume?: number;     // Trading volume
  open?: number;       // Opening price
  high?: number;       // Day's high price  
  low?: number;        // Day's low price
  pe?: number;         // Price to Earnings ratio
  eps?: number;        // Earnings Per Share
  dividend?: number;   // Dividend yield percentage
}

export type ViewMode = "daily" | "weekly" | "monthly" | "ytd";
export type SizeMetric = "marketCap" | "volume";
export type FilterOptions = {
  sector?: string;
  minMarketCap?: number;
  maxMarketCap?: number;
  minChange?: number;
  maxChange?: number;
};
