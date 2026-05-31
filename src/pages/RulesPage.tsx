import { useNavigate } from 'react-router-dom';

export default function RulesPage() {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('../assets/bgTable.png')]">
      <div className="mx-auto flex min-h-full w-full max-w-[960px] items-center justify-center px-[16px] py-[10px]">
        <div className="w-full max-w-[800px] max-h-[92dvh] overflow-hidden rounded-[12px] bg-black/60 px-[32px] py-[28px] text-white shadow-2xl text-[14px] leading-[22px]">
          <h2 className="mb-[18px] text-center text-[28px] font-bold leading-none">
            게임 설명
          </h2>

          <div className="mx-auto max-w-[680px]">
            <div className="mb-[14px]">
              <p>
                블랙잭은 카드 합을 <span className="font-bold text-yellow-300">21에 가깝게</span> 만드는 게임입니다.
                <br />
                21을 넘으면 패배합니다.
              </p>
            </div>

            <div className="mb-[14px]">
              <h3 className="mb-[8px] text-[18px] font-semibold text-yellow-200">
                카드 값
              </h3>
              <ul className="list-disc pl-[22px]">
                <li>2~10 → 숫자 그대로</li>
                <li>J, Q, K → 10</li>
                <li>A → 1 또는 11 중 유리한 값</li>
              </ul>
            </div>

            <div className="mb-[14px]">
              <h3 className="mb-[8px] text-[18px] font-semibold text-yellow-200">
                게임 진행
              </h3>
              <ol className="list-decimal pl-[22px]">
                <li>칩 버튼으로 배팅</li>
                <li>플레이어와 딜러가 카드 2장씩 받음</li>
                <li>딜러의 한 장은 숨겨진 상태로 시작</li>
                <li>플레이어는 Hit 또는 Stand 선택</li>
                <li>딜러는 합이 17 이상이 될 때까지 카드 받음</li>
                <li>21 이하에서 더 높은 점수가 승리, 같으면 무승부</li>
              </ol>
            </div>

            <div>
              <h3 className="mb-[8px] text-[18px] font-semibold text-yellow-200">
                자금 변동
              </h3>
              <ul className="list-disc pl-[22px]">
                <li>승리 → 배팅 금액만큼 획득</li>
                <li>패배 → 배팅 금액만큼 잃음</li>
                <li>무승부 → 변동 없음</li>
              </ul>
            </div>
          </div>

          <div className="mt-[18px] flex justify-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-[6px] bg-sky-900 px-[18px] py-[8px] text-[14px] transition hover:bg-sky-700"
            >
              뒤로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}