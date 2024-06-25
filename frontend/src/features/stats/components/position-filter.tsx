import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const positions = [
  { value: "QB", label: "QB" },
  { value: "HB", label: "HB" },
  { value: "FB", label: "FB" },
  { value: "TE", label: "TE" },
  { value: "WR", label: "WR" },
  { value: "LT", label: "LT" },
  { value: "LG", label: "LG" },
  { value: "C", label: "C" },
  { value: "RT", label: "RT" },
  { value: "RG", label: "RG" },
  { value: "RDE", label: "RDE" },
  { value: "RDT", label: "RDT" },
  { value: "LDT", label: "LDT" },
  { value: "LDE", label: "LDE" },
  { value: "ILB", label: "ILB" },
  { value: "OLB", label: "OLB" },
  { value: "CB", label: "CB" },
  { value: "FS", label: "FS" },
  { value: "SS", label: "SS" },
  { value: "K", label: "K" },
  { value: "P", label: "P" },
];

type PositionFilterProps = {
  value: string;
  setValue: any;
};

export default function PositionFilter({
  value,
  setValue,
}: PositionFilterProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between font-normal"
        >
          {value
            ? positions.find((position) => position.value === value)?.label
            : "Filter position..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search position..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {positions.map((position) => (
                <CommandItem
                  key={position.value}
                  value={position.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === position.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {position.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
