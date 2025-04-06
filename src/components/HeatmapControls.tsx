
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, BarChart2, Clock } from "lucide-react";
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
    <div className="flex flex-wrap gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <Clock className="mr-1 h-4 w-4" />
            {currentViewLabel} <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <BarChart2 className="mr-1 h-4 w-4" />
            {currentSizeMetricLabel} <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuLabel>Size By</DropdownMenuLabel>
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
  );
};

export default HeatmapControls;
