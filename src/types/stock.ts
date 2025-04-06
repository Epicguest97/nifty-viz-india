
export interface StockData {
  symbol: string;      // Stock symbol (e.g., "RELIANCE.NS")
  name: string;        // Company name
  sector: string;      // Industry sector
  change: number;      // Percentage change in price
  marketCap: number;   // Market capitalization in billions
  price: number;       // Current stock price
  volume?: number;     // Trading volume (optional for now)
}

export type ViewMode = "daily" | "weekly" | "monthly" | "ytd";
export type SizeMetric = "marketCap" | "volume";
