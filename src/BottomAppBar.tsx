import { useMediaQuery, useTheme } from "@mui/material";
import { CalendarMonth, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { ComponentProps } from "react";

interface Props {
  onNextClick: () => void;
  onPrevClick: () => void;
  onTodayClick: () => void;
  onCalendarClick: () => void;
}

export const BottomAppBar = ({
  onPrevClick,
  onNextClick,
  onTodayClick,
  onCalendarClick,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      className="flex h-20 items-center justify-between bg-stone-50 py-3 pl-1 pr-4"
      style={{
        order: isMobile ? 1 : 0,
      }}
    >
      <div className="flex items-center gap-1">
        <IconButton onClick={onPrevClick}>
          <ChevronLeft />
        </IconButton>
        <button
          className="h-10 rounded-full bg-stone-200 px-6 transition-colors hover:bg-stone-300 active:bg-stone-300"
          onClick={onTodayClick}
        >
          Heute
        </button>
        <IconButton onClick={onNextClick}>
          <ChevronRight fontSize="medium" />
        </IconButton>
      </div>
      <button
        className="h-14 w-14 rounded-2xl bg-stone-200 transition-colors hover:bg-stone-300 active:bg-stone-400"
        onClick={onCalendarClick}
      >
        <CalendarMonth />
      </button>
    </div>
  );
};

const IconButton = ({ children, ...buttonProps }: ComponentProps<"button">) => {
  return (
    <button {...buttonProps} className="group h-12 w-12">
      <div className="m-1 flex h-10 w-10 items-center justify-center rounded-full bg-stone-200 transition-colors group-hover:bg-stone-300 group-active:bg-stone-300">
        {children}
      </div>
    </button>
  );
};
