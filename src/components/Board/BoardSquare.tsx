import { finishSquare } from "../../boardSlice"
import { useAppDispatch } from "../../store"
import { Square } from "../../utilities/shared"

type Props = {
    square: Square
}
export default function BoardSquare({ square: { id, number, centerLocation: [x, y] } }: Props) {
    const dispatch = useAppDispatch()
    return (
        <>
            {number && (
                <>
                    <text
                        x={x}
                        y={y + 0.04}
                        fontSize={0.5}
                        textAnchor="middle"
                        dominantBaseline="middle"

                    >
                        {number}
                    </text>
                    <rect
                        x={x - 0.35}
                        y={y - 0.35}
                        width={0.7}
                        height={0.7}
                        fill="transparent"
                        onClick={() => dispatch(finishSquare(id))}
                    />
                </>
            )}
        </>
    )
}