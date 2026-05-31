type BettingPanelProps = {
  money: number;
  bet: number;
  disabled?: boolean;
  onAddFive: () => void;
  onAddTen: () => void;
  onAllIn: () => void;
  onStart: () => void;
  startLabel: string;
};

export default function BettingPanel({
  money,
  bet,
  disabled = false,
  onAddFive,
  onAddTen,
  onAllIn,
  onStart,
  startLabel
}: BettingPanelProps) {
  const canAddFive = !disabled && money >= bet + 5;
  const canAddTen = !disabled && money >= bet + 10;
  const canAllIn = !disabled && money > bet;

  return (
    <div className="mt-[10px]">
      <div className="flex flex-col items-center justify-center gap-[10px] md:flex-row">
        <div className="px-[12px] text-center md:text-left">
          <p className="text-[14px] leading-[20px]">
            현재 자금: <span className="font-bold text-yellow-300">${money}</span>
          </p>
          <p className="text-[14px] leading-[20px]">
            배팅 금액: <span className="font-bold text-yellow-300">${bet}</span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-[8px]">
          <button
            type="button"
            onClick={onAddFive}
            disabled={!canAddFive}
            className="rounded-[6px] bg-sky-900 px-[14px] py-[7px] text-[13px] transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            +$5
          </button>
          <button
            type="button"
            onClick={onAddTen}
            disabled={!canAddTen}
            className="rounded-[6px] bg-sky-900 px-[14px] py-[7px] text-[13px] transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            +$10
          </button>
          <button
            type="button"
            onClick={onAllIn}
            disabled={!canAllIn}
            className="rounded-[6px] bg-sky-900 px-[14px] py-[7px] text-[13px] transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            All-In
          </button>
          <button
            type="button"
            onClick={onStart}
            disabled={disabled}
            className="rounded-[6px] bg-emerald-700 px-[14px] py-[7px] text-[13px] font-semibold transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            {startLabel}
          </button>
        </div>
      </div>
    </div>
  );
}