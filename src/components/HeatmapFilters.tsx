
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface HeatmapFiltersProps {
  onSearch: (query: string) => void;
}

const HeatmapFilters = ({ onSearch }: HeatmapFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 border-b pb-3">
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search stocks..." 
          className="pl-8" 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Customize Display</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Market Cap: All</DropdownMenuItem>
          <DropdownMenuItem>Sectors: All</DropdownMenuItem>
          <DropdownMenuItem>Price Change: All</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default HeatmapFilters;
