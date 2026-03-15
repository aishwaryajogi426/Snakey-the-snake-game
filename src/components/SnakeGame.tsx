import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, RotateCcw, Play, Pause } from 'lucide-react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const speedRef = useRef(150);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake
      const onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setFood(generateFood());
  };

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check collision with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isPaused, isGameOver, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  const gameLoop = useCallback((timestamp: number) => {
    if (timestamp - lastUpdateTimeRef.current > speedRef.current) {
      moveSnake();
      lastUpdateTimeRef.current = timestamp;
    }
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [moveSnake]);

  useEffect(() => {
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameLoop]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
      <div className="flex justify-between w-full px-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-pink-400 uppercase tracking-widest font-mono">Sweet Score</span>
          <span className="text-3xl font-bold text-pink-600 font-mono">{score.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-pink-400 uppercase tracking-widest font-mono">Best Friends Score</span>
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-rose-400" />
            <span className="text-3xl font-bold text-pink-600 font-mono">{highScore.toString().padStart(4, '0')}</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-square w-full bg-pink-50 border-2 border-pink-100 rounded-2xl overflow-hidden shadow-sm">
        {/* Grid Background */}
        <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-20 pointer-events-none">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-pink-200" />
          ))}
        </div>

        {/* Snake */}
        {snake.map((segment, i) => {
          const isHead = i === 0;
          const isTail = i === snake.length - 1;
          
          return (
            <div
              key={i}
              className={`absolute transition-all duration-150 flex items-center justify-center ${
                isHead 
                  ? 'bg-[#CC7722] rounded-md z-10 shadow-sm' 
                  : isTail
                  ? 'bg-[#CC7722]/70 rounded-full scale-90'
                  : 'bg-[#CC7722]/90 rounded-sm'
              }`}
              style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                left: `${(segment.x * 100) / GRID_SIZE}%`,
                top: `${(segment.y * 100) / GRID_SIZE}%`,
              }}
            >
              {isHead && (
                <div className="flex justify-around w-full px-[10%]">
                  <div className="w-[20%] h-[20%] bg-white rounded-full flex items-center justify-center">
                    <div className="w-[50%] h-[50%] bg-black rounded-full" />
                  </div>
                  <div className="w-[20%] h-[20%] bg-white rounded-full flex items-center justify-center">
                    <div className="w-[50%] h-[50%] bg-black rounded-full" />
                  </div>
                </div>
              )}
              {isTail && (
                <div className="w-[40%] h-[40%] bg-pink-300 rounded-full opacity-50" />
              )}
            </div>
          );
        })}

        {/* Food */}
        <div
          className="absolute bg-rose-400 rounded-full shadow-sm flex items-center justify-center"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(food.x * 100) / GRID_SIZE}%`,
            top: `${(food.y * 100) / GRID_SIZE}%`,
          }}
        >
          <div className="w-[60%] h-[60%] bg-white/40 rounded-full" />
        </div>

        {/* Overlays */}
        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-center items-center justify-center z-20">
            <div className="text-center space-y-6 p-8">
              {isGameOver ? (
                <>
                  <h2 className="text-4xl font-black text-pink-600 uppercase tracking-tighter">Oh No!</h2>
                  <p className="text-pink-400 font-mono text-sm">Magic Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="flex items-center gap-2 mx-auto px-6 py-3 bg-pink-500 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-sm"
                  >
                    <RotateCcw size={20} />
                    Try Again
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-black text-pink-600 uppercase tracking-tighter">Nap Time</h2>
                  <p className="text-pink-400 font-mono text-sm">Press Space to Play</p>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="flex items-center gap-2 mx-auto px-8 py-4 bg-rose-400 text-white rounded-full font-bold hover:scale-105 transition-transform shadow-sm"
                  >
                    <Play size={24} fill="currentColor" />
                    Play!
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="p-4 bg-white/60 rounded-xl border border-pink-100 shadow-sm">
          <span className="text-[10px] text-pink-300 uppercase tracking-widest font-mono block mb-2">Move Me</span>
          <div className="flex gap-2">
            <kbd className="px-2 py-1 bg-pink-100 rounded text-xs text-pink-600 font-mono">Arrows</kbd>
            <span className="text-xs text-pink-400">to wiggle</span>
          </div>
        </div>
        <div className="p-4 bg-white/60 rounded-xl border border-pink-100 shadow-sm">
          <span className="text-[10px] text-pink-300 uppercase tracking-widest font-mono block mb-2">Pause</span>
          <div className="flex gap-2">
            <kbd className="px-2 py-1 bg-pink-100 rounded text-xs text-pink-600 font-mono">Space</kbd>
            <span className="text-xs text-pink-400">to rest</span>
          </div>
        </div>
      </div>
    </div>
  );
}
