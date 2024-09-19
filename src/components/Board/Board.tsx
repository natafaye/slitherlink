import { useSelector } from "react-redux"
import { selectBoard } from "../../redux/boardSlice"
import BoardSquare from "./BoardSquare"
import BoardLine from "./BoardLine"
import BoardDot from "./BoardDot"

type Props = {}
export default function Board({ }: Props) {
    const { squares, lines, rows, columns } = useSelector(selectBoard)
    const height = 40
    const width = 40

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width * columns}
            height={height * rows}
            viewBox={`-0.5 -0.5 ${columns + 1} ${rows + 1}`}
            className="select-none"
        >
            {squares.map((square, index) => (
                <BoardSquare
                    key={index}
                    square={square}
                />
            ))}
            {lines.map((line, index) => (
                <BoardLine
                    key={index}
                    line={line}
                />
            ))}
            { Array((rows + 1)).fill(null).map((_, y) => 
                Array((columns + 1)).fill(null).map((_, x) => 
                    <BoardDot key={`${x}-${y}`} location={[x, y]}/>
                )
            )}
        </svg>
    )
}