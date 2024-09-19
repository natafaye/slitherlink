import { useSelector } from "react-redux"
import { selectBoard } from "../../boardSlice"
import BoardSquare from "./OldBoardSquare"

type Props = {}
export default function Board({ }: Props) {
    const { squares, rows, columns } = useSelector(selectBoard)

    return (
        <div className="grid" style={{
            gridTemplateRows: `repeat(${rows}, 40px)`,
            gridTemplateColumns: `repeat(${columns}, 40px)`,
            backgroundSize: "40px 40px",
            padding: "20px",
            gap: "0px",
            backgroundImage: "radial-gradient(circle, #130E1B 3px, rgba(0, 0, 0, 0) 0)",
            backgroundRepeat: "repeat",
            backgroundColor: "#EDE8F3",
            width: "250px"
        }}>
            {squares.map((square, index) => (
                <BoardSquare
                    key={index}
                    square={square}
                />
            ))}
        </div>
    )
}