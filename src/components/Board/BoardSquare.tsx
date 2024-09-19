import { finishSquare, useAppDispatch } from "../../redux"
import type { Square } from "../../utilities"

type Props = {
  square: Square
}

export default function BoardSquare({
  square: {
    id,
    number,
    centerLocation: [x, y],
  },
}: Props) {
  const dispatch = useAppDispatch()
  return (
    <>
      {number !== null && (
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
