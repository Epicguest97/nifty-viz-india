
import { useMemo } from "react";
import { StockData, SizeMetric } from "@/types/stock";

interface StockHeatmapProps {
  stocks: StockData[];
  sizeMetric: SizeMetric;
}

const StockHeatmap = ({ stocks, sizeMetric }: StockHeatmapProps) => {
  // Group stocks by sector for the treemap layout
  const stocksBySector = useMemo(() => {
    const sectors: Record<string, StockData[]> = {};
    
    stocks.forEach(stock => {
      if (!sectors[stock.sector]) {
        sectors[stock.sector] = [];
      }
      sectors[stock.sector].push(stock);
    });
    
    return sectors;
  }, [stocks]);

  // Helper function to determine the background color based on price change
  const getBackgroundColor = (change: number) => {
    if (change > 3) return 'bg-green-700';
    if (change > 2) return 'bg-green-600';
    if (change > 1) return 'bg-green-500';
    if (change > 0) return 'bg-green-400';
    if (change === 0) return 'bg-gray-400';
    if (change > -1) return 'bg-red-400';
    if (change > -2) return 'bg-red-500';
    if (change > -3) return 'bg-red-600';
    return 'bg-red-700';
  };

  // Helper function to determine the text color based on background color
  const getTextColor = (change: number) => {
    if (change > 1 || change < -1) return 'text-white';
    return 'text-black';
  };

  // Helper function to determine the size of the box based on market cap or volume
  const getBoxSize = (stock: StockData) => {
    // Use the appropriate metric based on user selection
    const value = sizeMetric === 'marketCap' ? stock.marketCap : (stock.volume || 0);
    
    // Simple size calculation
    if (value > 2000) return 'w-52 h-44';
    if (value > 1000) return 'w-44 h-36';
    return 'w-36 h-28';
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap justify-center items-center gap-2 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-700 mr-1"></div>
          <span>&lt;-3%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 mr-1"></div>
          <span>-3% to -1%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-400 mr-1"></div>
          <span>-1% to 0%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-400 mr-1"></div>
          <span>0%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-400 mr-1"></div>
          <span>0% to 1%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 mr-1"></div>
          <span>1% to 3%</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-700 mr-1"></div>
          <span>&gt;3%</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="overflow-auto">
        {Object.entries(stocksBySector).map(([sector, sectorStocks]) => (
          <div key={sector} className="mb-8">
            <h3 className="text-lg font-semibold mb-2">{sector}</h3>
            <div className="flex flex-wrap gap-2">
              {sectorStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className={`${getBoxSize(stock)} ${getBackgroundColor(stock.change)} ${getTextColor(stock.change)} p-3 rounded flex flex-col justify-between cursor-pointer transition-transform hover:scale-105`}
                >
                  <div>
                    <div className="font-semibold truncate">{stock.name}</div>
                    <div className="text-sm opacity-90">{stock.symbol}</div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-xl font-bold">₹{stock.price}</div>
                    <div className={`${stock.change >= 0 ? 'text-green-100' : 'text-red-100'} font-semibold`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockHeatmap;
