// Lógica do jogo da velha separada para reutilização

export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Positions = Record<Player, number[]>;
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function calculateWinner(board: Cell[]) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }
  return null;
}

export function getEmptyIndices(board: Cell[]) {
  const res: number[] = [];
  for (let i = 0; i < board.length; i++) if (!board[i]) res.push(i);
  return res;
}

export function applyMove(
  board: Cell[],
  positions: Positions,
  player: Player,
  index: number
): { board: Cell[]; positions: Positions } {
  const nextBoard = [...board];
  const nextPositions: Positions = { X: [...positions.X], O: [...positions.O] };
  const list = nextPositions[player];
  if (list.length >= 3) {
    const removeIdx = list[0];
    nextBoard[removeIdx] = null;
    nextPositions[player] = list.slice(1);
  }
  nextBoard[index] = player;
  nextPositions[player] = [...nextPositions[player], index];
  return { board: nextBoard, positions: nextPositions };
}

export function pickHeuristicMove(board: Cell[], positions: Positions, ai: Player): number | null {
  const human: Player = ai === 'X' ? 'O' : 'X';
  const empties = getEmptyIndices(board);
  if (empties.length === 0) return null;

  // 1) Vencer se possível
  for (const idx of empties) {
    const sim = applyMove(board, positions, ai, idx).board;
    const res = calculateWinner(sim);
    if (res && res.winner === ai) return idx;
  }

  // 2) Bloquear vitória do humano
  for (const idx of empties) {
    const sim = applyMove(board, positions, human, idx).board;
    const res = calculateWinner(sim);
    if (res && res.winner === human) return idx;
  }

  // 3) Centro, cantos, laterais
  const order = [4, 0, 2, 6, 8, 1, 3, 5, 7];
  for (const idx of order) if (empties.includes(idx)) return idx;
  return empties[0] ?? null;
}

export function pickHardMove(board: Cell[], positions: Positions, ai: Player): number | null {
  const human: Player = ai === 'X' ? 'O' : 'X';
  const empties = getEmptyIndices(board);
  if (empties.length === 0) return null;

  // Ganhar
  for (const idx of empties) {
    const sim = applyMove(board, positions, ai, idx).board;
    const res = calculateWinner(sim);
    if (res && res.winner === ai) return idx;
  }

  // Bloquear
  for (const idx of empties) {
    const sim = applyMove(board, positions, human, idx).board;
    const res = calculateWinner(sim);
    if (res && res.winner === human) return idx;
  }

  // Procurar jogadas "seguras" (evitam vitória imediata do oponente)
  const safeMoves: number[] = [];
  for (const idx of empties) {
    const afterAi = applyMove(board, positions, ai, idx);
    const nextEmpties = getEmptyIndices(afterAi.board);
    let humanCanWin = false;
    for (const hIdx of nextEmpties) {
      const afterHuman = applyMove(afterAi.board, afterAi.positions, human, hIdx);
      const r = calculateWinner(afterHuman.board);
      if (r && r.winner === human) {
        humanCanWin = true;
        break;
      }
    }
    if (!humanCanWin) safeMoves.push(idx);
  }
  if (safeMoves.length) {
    const order = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    for (const idx of order) if (safeMoves.includes(idx)) return idx;
    return safeMoves[0];
  }

  // fallback para heurística
  return pickHeuristicMove(board, positions, ai);
}

export function pickRandomMove(board: Cell[]): number | null {
  const empties = getEmptyIndices(board);
  if (!empties.length) return null;
  const r = Math.floor(Math.random() * empties.length);
  return empties[r];
}

export function pickMoveByDifficulty(
  board: Cell[],
  positions: Positions,
  ai: Player,
  difficulty: Difficulty
): number | null {
  switch (difficulty) {
    case 'EASY':
      return pickRandomMove(board);
    case 'MEDIUM':
      return pickHeuristicMove(board, positions, ai);
    case 'HARD':
      return pickHardMove(board, positions, ai);
  }
}
