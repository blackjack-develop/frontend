type CardImageProps = {
  card: string;
  alt?: string;
  className?: string;
};

function getCardFilename(card: string): string {
  if (card === 'BACK') {
    return 'BACK.png';
  }

  const suit = card.slice(-1);
  const rank = card.slice(0, -1);

  const suitMap: Record<string, string> = {
    '♠': 'S',
    '♥': 'H',
    '♦': 'D',
    '♣': 'C',
  };

  const suitLetter = suitMap[suit];

  return `${rank}${suitLetter}.png`;
}

export default function CardImage({
  card,
  alt,
  className = '',
}: CardImageProps) {
  const filename = getCardFilename(card);
  const src = new URL(`../assets/${filename}`, import.meta.url).href;
  
  return (
    <img
      src={src}
      alt={alt ?? card}
      className={`w-[80px] h-auto shrink-0 ${className}`.trim()}
    />
  );
}