import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = -1;

type Piece = 0 | 1 | -1;
type Row = [Piece, Piece, Piece];
type Board = [Row, Row, Row];

export default function Game() {
  // if the turn is true
  // it is the first players turn
  const [turn, setTurn] = useState(true);

  const [board, setBoard] = useState<Board>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const winner = useMemo(() => checkWinner(board), [board]);

  function onPiecePressed(r: number, c: number) {
    const element = board[r][c];

    if (element !== EMPTY) return null;
    if (winner) return null;

    // if the first players turn
    if (turn) {
      board[r][c] = PLAYER1;
    } else {
      board[r][c] = PLAYER2;
    }

    console.log(board);

    // @ts-expect-error
    setBoard(board.slice());
    setTurn(!turn);
  }

  function resetBoard() {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setTurn(true);
  }

  // div -> View
  // text -> Text
  // button -> TouchableOpacity
  return (
    <View style={gameStyles.gameContainer}>
      <Text>{valueToPiece(winner)}</Text>

      <View style={gameStyles.game}>
        <Row row={board[0]} r={0} onPiecePressed={onPiecePressed} />
        <Row row={board[1]} r={1} onPiecePressed={onPiecePressed} />
        <Row row={board[2]} r={2} onPiecePressed={onPiecePressed} />
      </View>

      <TouchableOpacity style={gameStyles.reset} onPress={resetBoard}>
        <Text>Reset board</Text>
      </TouchableOpacity>
    </View>
  );
}

const gameStyles = StyleSheet.create({
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  game: { display: "flex", flexDirection: "row" },
  reset: {
    fontSize: 20,
    backgroundColor: "coral",
  },
});

type RowProps = {
  row: Row;
  r: number;
  onPiecePressed: (r: number, c: number) => void;
};
function Row({ row, r, onPiecePressed }: RowProps) {
  return (
    <View style={rowStyles.row}>
      <Piece value={row[0]} r={r} c={0} onPiecePressed={onPiecePressed} />
      <Piece value={row[1]} r={r} c={1} onPiecePressed={onPiecePressed} />
      <Piece value={row[2]} r={r} c={2} onPiecePressed={onPiecePressed} />
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    display: "flex",
  },
});

type PieceProps = {
  value: Piece;
  r: number;
  c: number;
  onPiecePressed: (r: number, c: number) => void;
};
function Piece({ value, r, c, onPiecePressed }: PieceProps) {
  const character = valueToPiece(value);

  function handleClick() {
    onPiecePressed(r, c);
  }

  return (
    <TouchableOpacity onPress={handleClick} style={pieceStyles.piece}>
      <Text style={pieceStyles.text}>{character}</Text>
    </TouchableOpacity>
  );
}

const pieceStyles = StyleSheet.create({
  piece: {
    width: 100,
    height: 100,
    color: "black",
    textAlign: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "black",
    display: "flex",
  },
  text: {
    fontSize: 80,
    textAlign: "center",
  },
});

function valueToPiece(value: number | null) {
  if (value === EMPTY) return null;
  if (value === PLAYER1) return "X";
  if (value === PLAYER2) return "O";

  return null;
}

function checkWinner(board: Board) {
  let sum = 0;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      sum += board[r][c];
    }

    if (sum == -3) {
      return -1;
    } else if (sum == 3) {
      return 1;
    }

    sum = 0;
  }

  sum = 0;
  for (let c = 0; c < 3; c++) {
    for (let r = 0; r < 3; r++) {
      sum += board[r][c];
    }

    if (sum == -3) {
      return -1;
    } else if (sum == 3) {
      return 1;
    }

    sum = 0;
  }

  sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += board[i][i];
  }

  if (sum == -3) {
    return -1;
  } else if (sum == 3) {
    return 1;
  }

  sum = 0;
  for (let i = 0; i < 3; i++) {
    sum += board[i][2 - i];
  }

  if (sum == -3) {
    return -1;
  } else if (sum == 3) {
    return 1;
  }

  return null;
}
