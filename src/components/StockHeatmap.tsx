
import { useMemo } from "react";
import { StockData, SizeMetric } from "@/types/stock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    
    // More granular size calculation for Finviz-style boxes
    if (value > 2000) return 'w-[120px] h-[90px]';
    if (value > 1000) return 'w-[110px] h-[80px]';
    return 'w-[100px] h-[70px]';
  };

  return (
    <div className="space-y-4">
      {/* Color Legend */}
      <div className="flex flex-wrap justify-center items-center gap-2 text-xs border-b pb-2">
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

      {/* Heatmap - Finviz style */}
      <div className="overflow-auto">
        {Object.entries(stocksBySector).map(([sector, sectorStocks]) => (
          <div key={sector} className="mb-4">
            <h3 className="text-md font-bold bg-secondary px-2 py-1 mb-2">{sector}</h3>
            <div className="flex flex-wrap gap-1">
              {sectorStocks.map((stock) => (
                <TooltipProvider key={stock.symbol}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`${getBoxSize(stock)} ${getBackgroundColor(stock.change)} ${getTextColor(stock.change)} p-1.5 flex flex-col justify-between cursor-pointer border border-gray-300`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="font-bold text-xs truncate">{stock.symbol}</div>
                          <div className="text-xs">{stock.change >= 0 ? '+' : ''}{stock.change}%</div>
                        </div>
                        <div className="text-[10px] truncate">{stock.name}</div>
                        <div className="font-semibold">₹{stock.price}</div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="space-y-1">
                        <div className="font-bold">{stock.name} ({stock.symbol})</div>
                        <div>Price: ₹{stock.price}</div>
                        <div>Change: {stock.change >= 0 ? '+' : ''}{stock.change}%</div>
                        <div>Market Cap: ₹{stock.marketCap} B</div>
                        {stock.volume && <div>Volume: {stock.volume.toLocaleString()}</div>}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockHeatmap;
