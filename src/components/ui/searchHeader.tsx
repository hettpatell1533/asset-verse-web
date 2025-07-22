import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchAddHeaderProps {
  searchPlaceholder?: string;
  buttonLabel?: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

export const SearchAddHeader: React.FC<SearchAddHeaderProps> = ({
  searchPlaceholder = "Search here...",
  buttonLabel = "Add",
  onSearchChange,
  onAddClick,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-muted rounded-lg mb-5">
      <div className="relative w-full max-w-sm">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
          <Search className="w-4 h-4" />
        </span>
        <Input
          type="text"
          placeholder={searchPlaceholder}
          className="pl-10"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <Button className="ml-4 bg-primary text-white hover:bg-primary/90" onClick={onAddClick}>
        {buttonLabel}
      </Button>
    </div>
  );
};
