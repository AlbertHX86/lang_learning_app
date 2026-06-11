import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Position = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

type ScoreRecord = {
  id: string;
  score: number;
  createdAt: string;
};

const GRID_SIZE = 20;
const CELL_SIZE = 18;
const INITIAL_SNAKE: Position[] = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
];
const INITIAL_DIRECTION: Direction = 'RIGHT';
const STORAGE_KEY = 'snake-game-score-records';
const TICK_MS = 140;
const MAX_RECORDS = 5;

const directionVectors: Record<Direction, Position> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const oppositeDirection: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

const createFood = (snake: Position[]): Position => {
  while (true) {
    const nextFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    const overlapsSnake = snake.some(
      (segment) => segment.x === nextFood.x && segment.y === nextFood.y,
    );

    if (!overlapsSnake) {
      return nextFood;
    }
  }
};

const createScoreRecord = (score: number): ScoreRecord => ({
  id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  score,
  createdAt: new Date().toISOString(),
});

const readScoreRecords = (): ScoreRecord[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as ScoreRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const createScoreRecords = (records: ScoreRecord[]): ScoreRecord[] => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }
  return records;
};

const updateScoreRecords = (score: number): ScoreRecord[] => {
  const nextRecords = [...readScoreRecords(), createScoreRecord(score)]
    .sort((a, b) => b.score - a.score || a.createdAt.localeCompare(b.createdAt))
    .slice(0, MAX_RECORDS);

  return createScoreRecords(nextRecords);
};

const deleteScoreRecord = (id?: string): ScoreRecord[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  if (!id) {
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }

  const nextRecords = readScoreRecords().filter((record) => record.id !== id);
  return createScoreRecords(nextRecords);
};

const formatTime = (value: string) =>
  new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

const SnakeGame = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>(() => createFood(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [scoreRecords, setScoreRecords] = useState<ScoreRecord[]>([]);
  const directionRef = useRef<Direction>(INITIAL_DIRECTION);
  const hasSavedScoreRef = useRef(false);

  useEffect(() => {
    setScoreRecords(readScoreRecords());
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(createFood(INITIAL_SNAKE));
    setScore(0);
    setIsGameOver(false);
    setIsRunning(false);
    hasSavedScoreRef.current = false;
  }, []);

  const handleDirectionChange = useCallback((nextDirection: Direction) => {
    if (oppositeDirection[directionRef.current] === nextDirection) {
      return;
    }

    directionRef.current = nextDirection;
    setDirection(nextDirection);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyMap: Record<string, Direction> = {
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
        ArrowLeft: 'LEFT',
        ArrowRight: 'RIGHT',
      };

      const nextDirection = keyMap[event.key];
      if (!nextDirection) {
        return;
      }

      event.preventDefault();
      handleDirectionChange(nextDirection);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDirectionChange]);

  useEffect(() => {
    if (!isRunning || isGameOver) {
      return;
    }

    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];
        const vector = directionVectors[directionRef.current];
        const nextHead = {
          x: head.x + vector.x,
          y: head.y + vector.y,
        };

        const hitWall =
          nextHead.x < 0 ||
          nextHead.x >= GRID_SIZE ||
          nextHead.y < 0 ||
          nextHead.y >= GRID_SIZE;

        const hitSelf = currentSnake.some(
          (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
        );

        if (hitWall || hitSelf) {
          setIsGameOver(true);
          setIsRunning(false);
          return currentSnake;
        }

        const hasEatenFood = nextHead.x === food.x && nextHead.y === food.y;
        const nextSnake = [nextHead, ...currentSnake];

        if (hasEatenFood) {
          setScore((currentScore) => currentScore + 1);
          setFood(createFood(nextSnake));
          return nextSnake;
        }

        nextSnake.pop();
        return nextSnake;
      });
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [food, isGameOver, isRunning]);

  useEffect(() => {
    if (!isGameOver || score <= 0 || hasSavedScoreRef.current) {
      return;
    }

    const nextRecords = updateScoreRecords(score);
    setScoreRecords(nextRecords);
    hasSavedScoreRef.current = true;
  }, [isGameOver, score]);

  const bestScore = useMemo(
    () => scoreRecords.reduce((max, record) => Math.max(max, record.score), 0),
    [scoreRecords],
  );

  const boardCells = useMemo(() => {
    const snakeSet = new Set(snake.map((segment) => `${segment.x}-${segment.y}`));
    const headKey = `${snake[0].x}-${snake[0].y}`;
    const foodKey = `${food.x}-${food.y}`;

    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      const key = `${x}-${y}`;

      if (key === foodKey) {
        return 'food';
      }

      if (key === headKey) {
        return 'head';
      }

      if (snakeSet.has(key)) {
        return 'body';
      }

      return 'empty';
    });
  }, [food, snake]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-gray-200 dark:bg-gray-800/90 dark:ring-gray-700 lg:flex-row">
      <div className="flex-1">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-blue-500">Snake Game</p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">贪吃蛇挑战</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              使用方向键控制移动，撞墙或撞到自己时游戏结束。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm sm:min-w-56">
            <div className="rounded-2xl bg-blue-50 px-4 py-3 text-blue-700 dark:bg-blue-500/10 dark:text-blue-200">
              <div className="text-xs uppercase tracking-wide">当前分数</div>
              <div className="mt-1 text-2xl font-bold">{score}</div>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              <div className="text-xs uppercase tracking-wide">历史最高</div>
              <div className="mt-1 text-2xl font-bold">{bestScore}</div>
            </div>
          </div>
        </div>

        <div
          className="grid rounded-3xl border-4 border-gray-900 bg-gray-100 p-2 dark:border-gray-200 dark:bg-gray-900"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
            width: GRID_SIZE * CELL_SIZE + 16,
            maxWidth: '100%',
          }}
        >
          {boardCells.map((cell, index) => (
            <div
              key={index}
              className={[
                'rounded-[4px] border border-black/5 aspect-square',
                cell === 'head'
                  ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]'
                  : cell === 'body'
                    ? 'bg-green-400'
                    : cell === 'food'
                      ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                      : 'bg-white dark:bg-gray-800',
              ].join(' ')}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setIsRunning((current) => !current)}
            disabled={isGameOver}
            className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isRunning ? '暂停' : '开始 / 继续'}
          </button>
          <button
            onClick={resetGame}
            className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            重新开始
          </button>
          <button
            onClick={() => setScoreRecords(deleteScoreRecord())}
            className="rounded-full border border-rose-300 px-5 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 dark:border-rose-500/40 dark:text-rose-300 dark:hover:bg-rose-500/10"
          >
            清空排行榜（Delete）
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:max-w-sm">
          {(['UP', 'LEFT', 'DOWN', 'RIGHT'] as Direction[]).map((item) => (
            <button
              key={item}
              onClick={() => handleDirectionChange(item)}
              className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              {item === 'UP' && '↑ 上'}
              {item === 'LEFT' && '← 左'}
              {item === 'DOWN' && '↓ 下'}
              {item === 'RIGHT' && '→ 右'}
            </button>
          ))}
        </div>

        {isGameOver && (
          <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
            游戏结束！本局得分 {score}，已自动执行本地分数存储 Update。
          </div>
        )}
      </div>

      <aside className="w-full rounded-3xl bg-gray-50 p-5 dark:bg-gray-900/70 lg:max-w-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">本地分数存储 CRUD</h2>
        <ul className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <li><strong>Create：</strong>首次写入排行榜时调用 <code>createScoreRecords</code>。</li>
          <li><strong>Read：</strong>页面加载时通过 <code>readScoreRecords</code> 读取 localStorage。</li>
          <li><strong>Update：</strong>游戏结束后通过 <code>updateScoreRecords</code> 更新排行榜。</li>
          <li><strong>Delete：</strong>点击“清空排行榜”后通过 <code>deleteScoreRecord</code> 删除记录。</li>
        </ul>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">排行榜</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">Top {MAX_RECORDS}</span>
          </div>

          {scoreRecords.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
              暂无记录，开始一局游戏吧。
            </div>
          ) : (
            <div className="space-y-3">
              {scoreRecords.map((record, index) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-gray-800"
                >
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">#{index + 1} · {record.score} 分</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{formatTime(record.createdAt)}</div>
                  </div>
                  <button
                    onClick={() => setScoreRecords(deleteScoreRecord(record.id))}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    删除
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </section>
  );
};

export default SnakeGame;
