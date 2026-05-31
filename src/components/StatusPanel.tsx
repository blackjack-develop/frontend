type StatusPanelProps = {
  money: number;
  bet: number;
  status: string;
  message: string;
};

function getStatusLabel(status: string): string {
  switch (status) {
    case 'PLAYER_TURN':
      return '플레이어 턴';
    case 'DEALER_TURN':
      return '딜러 턴';
    case 'PLAYER_BUST':
      return '플레이어 버스트';
    case 'DEALER_BUST':
      return '딜러 버스트';
    case 'PLAYER_WIN':
      return '플레이어 승리';
    case 'DEALER_WIN':
      return '딜러 승리';
    case 'PUSH':
      return '무승부';
    default:
      return status;
  }
}

export default function StatusPanel({ money, bet, status, message }: StatusPanelProps) {
  return (
    <div className="my-[12px] rounded-[12px] bg-white/10 px-[14px] py-[10px]">
      <div className="flex items-center justify-between gap-[10px] text-[14px] leading-[20px]">
        <span>현재 자금</span>
        <strong className="text-yellow-300">${money}</strong>
      </div>

      <div className="mt-[2px] flex items-center justify-between gap-[10px] text-[14px] leading-[20px]">
        <span>배팅 금액</span>
        <strong className="text-yellow-300">${bet}</strong>
      </div>

      <div className="mt-[2px] flex items-center justify-between gap-[10px] text-[14px] leading-[20px]">
        <span>게임 상태</span>
        <strong>{getStatusLabel(status)}</strong>
      </div>

      <p className="mt-[6px] text-[12px] leading-[16px] text-yellow-200">
        {message}
      </p>
    </div>
  );
}