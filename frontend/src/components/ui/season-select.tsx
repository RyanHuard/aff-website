import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type SeasonSelectProps = {
  value: string;
  handleSeasonSelect: (e: string) => void;
  statYearsOnly?: boolean;
};

export default function SeasonSelect({
  value,
  handleSeasonSelect,
  statYearsOnly = false,
}: SeasonSelectProps) {
  return (
    <Select value={value} onValueChange={handleSeasonSelect}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {!statYearsOnly && (
          <>
            <SelectItem value="1">2022</SelectItem>
            <SelectItem value="2">2023</SelectItem>
            <SelectItem value="3">2024</SelectItem>
          </>
        )}
        <SelectItem value="4">2025</SelectItem>
        <SelectItem value="5">2026</SelectItem>
        <SelectItem value="6">2027</SelectItem>
        <SelectItem value="7">2028</SelectItem>
        <SelectItem value="8">2029</SelectItem>
        <SelectItem value="9">2030</SelectItem>
      </SelectContent>
    </Select>
  );
}
