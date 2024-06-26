import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const Carousel = ({ children }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemWidth = 176;

  return (
    <div className="flex w-full min-w-full justify-between bg-slate-50">
      <Button
        size="icon"
        variant="outline"
        onClick={() => setCurrentIndex(currentIndex - 1)}
        className="my-auto h-24 bg-[#f5f5f5] text-aff-blue hover:bg-slate-200"
      >
        <ChevronLeft />
      </Button>
      <div
        id="carousel-container"
        className="flex w-full max-w-full flex-nowrap overflow-hidden overflow-x-hidden"
      >
        <div
          className="flex min-w-full flex-nowrap items-center justify-start"
          style={{
            transform: `translate(-${currentIndex * itemWidth}px)`,
            transition: "0.2s cubic-bezier(0.39, 0.575, 0.565, 1)",
          }}
        >
          {children}
        </div>
      </div>
      <Button
        size="icon"
        variant="outline"
        onClick={() => setCurrentIndex(currentIndex + 1)}
        className="my-auto h-24 bg-[#f5f5f5] text-aff-blue hover:bg-slate-200"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Carousel;
