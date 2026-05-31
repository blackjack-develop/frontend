import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('../assets/bgTable.png')]">
      <div className="mx-auto flex min-h-full w-full max-w-[960px] items-center justify-center px-[16px] py-[12px]">
        <div className="w-full max-w-[800px] max-h-[92dvh] overflow-hidden rounded-[12px] bg-black/60 px-[32px] py-[32px] text-center text-white shadow-2xl">
          <h1 className="mb-[32px] text-[48px] font-bold leading-none">
            BlackJack
          </h1>

          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => navigate('/game')}
              className="my-[10px] w-[220px] rounded-[6px] bg-sky-900 px-[16px] py-[12px] text-[18px] transition hover:bg-sky-700"
            >
              게임 시작
            </button>

            <button
              type="button"
              onClick={() => navigate('/rules')}
              className="my-[10px] w-[220px] rounded-[6px] bg-sky-900 px-[16px] py-[12px] text-[18px] transition hover:bg-sky-700"
            >
              게임 설명
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="my-[10px] w-[220px] rounded-[6px] bg-sky-900 px-[16px] py-[12px] text-[18px] transition hover:bg-sky-700"
            >
              게임 종료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}