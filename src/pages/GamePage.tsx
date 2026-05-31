import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hitGame, standGame, startGame, getGame, nextRound } from '../api/blackjackApi';
import ActionPanel from '../components/ActionPanel';
import BettingPanel from '../components/BettingPanel';
import CardImage from '../components/CardImage';
import StatusPanel from '../components/StatusPanel';
import type { GameResponse } from '../types/blackjack';

const INITIAL_MONEY = 100;
const STORAGE_KEY = 'blackjack_gameId';

export default function GamePage() {
  const navigate = useNavigate();

  const [bet, setBet] = useState(0);
  const [game, setGame] = useState<GameResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inRound = game?.status === 'PLAYER_TURN';
  const showBetting = !game || !inRound;

  const currentMoney = game ? game.money : INITIAL_MONEY;
  const dealerCards = game?.dealerCards ?? [];
  const playerCards = game?.playerCards ?? [];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const gameId = Number(saved);
    if (!Number.isFinite(gameId)) {
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const restored = await getGame(gameId);
        setGame(restored);
      } catch (e) {
        // 서버 재시작(메모리 초기화) or 잘못된 id
        localStorage.removeItem(STORAGE_KEY);
        setGame(null);
        setBet(0);
        setErrorMessage('서버가 재시작되어 새 게임을 시작합니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAddBet = (amount: number) => {
    if (loading) return;
    if (!showBetting) return; //진행 중엔 배팅 변경 불가
    if (currentMoney < bet + amount) return;
    setBet((prev) => prev + amount);
  };

  const handleAllIn = () => {
    if (loading) return;
    if (!showBetting) return;
    setBet(currentMoney);
  };

  const handleStartGame = async () => {
    if (loading) return;
    if (bet <= 0) {
      setErrorMessage('배팅하세요');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      const response = await startGame({ bet }); //startGame만
      setGame(response);
      localStorage.setItem(STORAGE_KEY, String(response.gameId));
      setBet(0);
    } catch (e) {
      console.error(e);
      setErrorMessage('새 게임 시작에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextRound = async () => {
    if (loading) return;

    if (!game) {
      setErrorMessage('진행 중인 게임이 없습니다.');
      return;
    }

    if (bet <= 0) {
      setErrorMessage('배팅하세요');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');

      const response = await nextRound(game.gameId, bet); //nextRound만
      setGame(response);
      localStorage.setItem(STORAGE_KEY, String(response.gameId));
      setBet(0);
    } catch (e) {
      console.error(e);
      setErrorMessage('다음 라운드 시작에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleHit = async () => {
    if (!game || loading) return;
    if (!inRound) return;

    try {
      setLoading(true);
      setErrorMessage('');
      const response = await hitGame(game.gameId);
      setGame(response);
    } catch (error) {
      console.error(error);
      setErrorMessage('Hit 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleStand = async () => {
    if (!game || loading) return;
    if (!inRound) return;

    try {
      setLoading(true);
      setErrorMessage('');
      const response = await standGame(game.gameId);
      setGame(response);
    } catch (error) {
      console.error(error);
      setErrorMessage('Stand 처리에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    //로컬에 저장된 gameId 제거 → 더 이상 이어하기 안 됨
    localStorage.removeItem(STORAGE_KEY);

    //화면 상태 초기화
    setGame(null);
    setBet(0);
    setLoading(false);
    setErrorMessage('처음부터 새 게임을 시작합니다.');
  };

  return (
    <div className="h-[100dvh] overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('../assets/bgTable.png')]">
      <div className="mx-auto flex min-h-full w-full max-w-[960px] items-center justify-center px-[16px] py-[10px]">
        <div className="w-full max-w-[800px] max-h-[97dvh] overflow-hidden rounded-[12px] bg-black/60 px-[24px] py-[20px] text-white shadow-2xl text-[14px] leading-[20px]">
          <div className="my-[5px]">
            <h3 className="mb-[6px] text-[18px] font-semibold">딜러</h3>
            <div className="flex min-h-[84px] flex-wrap items-center gap-[6px]">
              {dealerCards.length > 0 ? (
                dealerCards.map((card, index) => (
                  <CardImage
                    key={`${card}-${index}`}
                    card={card}
                    className="w-[64px]"
                  />
                ))
              ) : (
                <div className="text-white/70">카드가 없습니다.</div>
              )}
            </div>
            <p className="mt-[6px]">
              합: <span className="font-bold">{game ? game.dealerScoreText : ''}</span>
            </p>
          </div>

          <div className='h-[1px] bg-white/50 my-[15px]'/>

          <div className="mb-[20px]">
            <h3 className="mb-[6px] text-[18px] font-semibold">플레이어</h3>
            <div className="flex min-h-[84px] flex-wrap items-center gap-[6px]">
              {playerCards.length > 0 ? (
                playerCards.map((card, index) => (
                  <CardImage
                    key={`${card}-${index}`}
                    card={card}
                    className="w-[64px]"
                  />
                ))
              ) : (
                <div className="text-white/70">카드가 없습니다.</div>
              )}
            </div>
            <p className="mt-[6px]">
              합: <span className="font-bold">{game ? game.playerScore : ''}</span>
            </p>
          </div>

          <StatusPanel
            money={currentMoney}
            bet={game ? game.bet : bet}
            status={game ? game.status : 'PLAYER_TURN'}
            message={
              loading
                ? '처리 중입니다...'
                : game
                  ? game.message
                  : '배팅 후 게임을 시작하세요.'
            }
          />

          {errorMessage && (
            <div className="mb-[10px] rounded-[6px] bg-red-500/30 px-[12px] py-[8px] text-center text-[12px] leading-[16px] text-white">
              {errorMessage}
            </div>
          )}

          {showBetting ? (
            <BettingPanel
              money={currentMoney}
              bet={bet}
              disabled={loading}
              onAddFive={() => handleAddBet(5)}
              onAddTen={() => handleAddBet(10)}
              onAllIn={handleAllIn}
              onStart={!game ? handleStartGame : handleNextRound}
              startLabel={!game ? '게임 시작' : '다음 라운드'}
            />
          ) : (
            <ActionPanel
              disabled={!inRound || loading}
              onHit={handleHit}
              onStand={handleStand}
            />
          )}

          <div className="mt-[12px] flex flex-wrap justify-center gap-[10px]">

            <button
              type="button"
              onClick={handleStartOver}
              className="rounded-[6px] bg-rose-700 px-[16px] py-[8px] text-[14px] transition hover:bg-rose-600"
            >
              새 게임
            </button>

            <button
              type="button"
              onClick={() => navigate('/')}
              className="rounded-[6px] bg-slate-700 px-[16px] py-[8px] text-[14px] transition hover:bg-slate-600"
            >
              뒤로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}