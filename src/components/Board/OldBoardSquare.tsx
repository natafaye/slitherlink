import { BOTTOM, LEFT, RIGHT, Square, TOP } from "../../utilities/generateBoard"

type Props = {
    square: Square
}

export default function BoardSquare({ square: { number, lines, squares } }: Props) {
    const height = 40
    const width = 40
    return (
        <div
            className="aspect-square flex items-center justify-center"
            style={{
                border: "0 solid #000000",
                borderRadius: "3px",
                height: (!squares[TOP] || !squares[BOTTOM]) ? height + 3 + "px" : height + "px",
                width: (!squares[LEFT] || !squares[RIGHT]) ? width + 3 + "px" : width + "px",
                borderWidth: lines.map((line, direction) =>
                    line?.filled ? (squares[direction] ? "3px" : "6px") : "2px"
                ).join(" "),
                borderColor: lines.map((line) =>
                    line?.filled ? "black" : "gray"
                ).join(" "),
                borderStyle: lines.map((line) =>
                    line?.filled ? "solid" : "dashed"
                ).join(" "),
                margin: lines.map((line, direction) =>
                    line?.filled ? (squares[direction] ? "0" : "-3px") : "0"
                ).join(" ")
            }}
        >
            {number}
        </div>
    )
}