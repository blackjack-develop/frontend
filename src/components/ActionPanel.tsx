type ActionPanelProps = {
  disabled?: boolean;
  onHit: () => void;
  onStand: () => void;
};

export default function ActionPanel({ disabled = false, onHit, onStand }: ActionPanelProps) {
  return (
    <div className="mt-[10px] flex flex-wrap justify-center gap-[10px]">
      <button
        type="button"
        onClick={onHit}
        disabled={disabled}
        className="min-w-[110px] rounded-[6px] bg-sky-900 px-[14px] py-[7px] text-[13px] transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-gray-600"
      >
        Hit
      </button>

      <button
        type="button"
        onClick={onStand}
        disabled={disabled}
        className="min-w-[110px] rounded-[6px] bg-amber-700 px-[14px] py-[7px] text-[13px] transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-gray-600"
      >
        Stand
      </button>
    </div>
  );
}