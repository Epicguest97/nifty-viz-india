
import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StockHeatmap from "@/components/StockHeatmap";
import HeatmapControls from "@/components/HeatmapControls";
import HeatmapFilters from "@/components/HeatmapFilters";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { StockData, ViewMode, SizeMetric } from "@/types/stock";
import { toast } from "@/hooks/use-toast";

// Mock data structure to establish the UI before API integration
const mockStocks: StockData[] = [
  { symbol: "RELIANCE.NS", name: "Reliance Industries", sector: "Energy", change: 2.41, marketCap: 3920, price: 2913 },
  { symbol: "TCS.NS", name: "Tata Consultancy Services", sector: "IT", change: -0.87, marketCap: 2780, price: 3618 },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank", sector: "Financial Services", change: 0.24, marketCap: 2410, price: 1672 },
  { symbol: "INFY.NS", name: "Infosys", sector: "IT", change: -1.41, marketCap: 1890, price: 1452 },
  { symbol: "HINDUNILVR.NS", name: "Hindustan Unilever", sector: "Consumer Goods", change: 1.02, marketCap: 1340, price: 2563 },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank", sector: "Financial Services", change: 0.62, marketCap: 1260, price: 1078 },
  { symbol: "BHARTIARTL.NS", name: "Bharti Airtel", sector: "Telecom", change: -0.33, marketCap: 1120, price: 958 },
  { symbol: "SBIN.NS", name: "State Bank of India", sector: "Financial Services", change: 1.54, marketCap: 1020, price: 682 },
  { symbol: "KOTAKBANK.NS", name: "Kotak Mahindra Bank", sector: "Financial Services", change: -0.42, marketCap: 920, price: 1744 },
  { symbol: "BAJFINANCE.NS", name: "Bajaj Finance", sector: "Financial Services", change: -2.13, marketCap: 860, price: 6724 },
  { symbol: "ASIANPAINT.NS", name: "Asian Paints", sector: "Consumer Goods", change: 0.87, marketCap: 850, price: 3122 },
  { symbol: "LT.NS", name: "Larsen & Toubro", sector: "Construction", change: 1.76, marketCap: 830, price: 2956 }
  // Just showing 12 for brevity, the real implementation would have all 50
];

// Available view modes
const viewModes = [
  { id: "daily", label: "Daily" },
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "ytd", label: "YTD" },
];

// Available size metrics
const sizeMetrics = [
  { id: "marketCap", label: "Market Cap" },
  { id: "volume", label: "Volume" },
];

const Index = () => {
  const [stocks, setStocks] = useState<StockData[]>(mockStocks);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>(mockStocks);
  const [viewMode, setViewMode] = useState<ViewMode>("daily");
  const [sizeMetric, setSizeMetric] = useState<SizeMetric>("marketCap");
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle search functionality
  const handleSearch = useCallback((query: string) => {
    if (!query) {
      setFilteredStocks(stocks);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = stocks.filter(
      stock => 
        stock.name.toLowerCase().includes(lowercaseQuery) || 
        stock.symbol.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredStocks(filtered);
  }, [stocks]);
  
  // This function will be replaced with API call
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      // Apply random changes to mock data for visual effect
      const updatedStocks = stocks.map(stock => ({
        ...stock,
        change: parseFloat((stock.change + (Math.random() * 2 - 1)).toFixed(2))
      }));
      setStocks(updatedStocks);
      setFilteredStocks(updatedStocks);
      setIsLoading(false);
      toast({
        title: "Data Refreshed",
        description: "Stock data has been updated",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-2 md:p-4">
      <div className="container mx-auto space-y-4">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <div>
            <h1 className="text-2xl font-bold">Nifty 50 Heatmap</h1>
            <p className="text-sm text-muted-foreground">
              Visualize the performance of India's 50 largest publicly traded companies
            </p>
          </div>
          <Button 
            onClick={refreshData} 
            variant="outline" 
            disabled={isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </header>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-0 pt-2 px-3">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
              <HeatmapControls 
                viewModes={viewModes} 
                currentView={viewMode}
                setViewMode={setViewMode}
                sizeMetrics={sizeMetrics}
                currentSizeMetric={sizeMetric}
                setSizeMetric={setSizeMetric}
              />
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-3 px-3">
            <HeatmapFilters onSearch={handleSearch} />
            <StockHeatmap stocks={filteredStocks} sizeMetric={sizeMetric} />
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground text-center">
          Data source: Yahoo Finance (to be integrated)
        </div>
      </div>
    </div>
  );
};

export default Index;
