
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ViewMode, SizeMetric } from "@/types/stock";

type OptionType = {
  id: string;
  label: string;
};

interface HeatmapControlsProps {
  viewModes: OptionType[];
  currentView: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sizeMetrics: OptionType[];
  currentSizeMetric: SizeMetric;
  setSizeMetric: (metric: SizeMetric) => void;
}

const HeatmapControls = ({
  viewModes,
  currentView,
  setViewMode,
  sizeMetrics,
  currentSizeMetric,
  setSizeMetric,
}: HeatmapControlsProps) => {
  // Find the label for the current view
  const currentViewLabel = viewModes.find((mode) => mode.id === currentView)?.label || '';
  
  // Find the label for the current size metric
  const currentSizeMetricLabel = sizeMetrics.find((metric) => metric.id === currentSizeMetric)?.label || '';

  return (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
      <div className="flex space-x-1 items-center">
        <span className="text-sm text-muted-foreground">View:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              {currentViewLabel} <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Time Period</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {viewModes.map((mode) => (
              <DropdownMenuItem
                key={mode.id}
                onClick={() => setViewMode(mode.id as ViewMode)}
                className={currentView === mode.id ? "bg-accent" : ""}
              >
                {mode.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex space-x-1 items-center">
        <span className="text-sm text-muted-foreground">Size by:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              {currentSizeMetricLabel} <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Size Metric</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sizeMetrics.map((metric) => (
              <DropdownMenuItem
                key={metric.id}
                onClick={() => setSizeMetric(metric.id as SizeMetric)}
                className={currentSizeMetric === metric.id ? "bg-accent" : ""}
              >
                {metric.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default HeatmapControls;
