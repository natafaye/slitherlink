import { Line } from "../../utilities/shared"
import { useAppDispatch } from "../../store"
import { toggleLine } from "../../boardSlice"

type Props = {
  line: Line
}

export default function BoardLine({
  line: {
    id,
    filled,
    startLocation: [x1, y1],
    endLocation: [x2, y2],
  },
}: Props) {
  const dispatch = useAppDispatch()
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={filled ? 0.08 : 0.05}
        strokeDasharray={filled ? 0 : 0.08}
        stroke={filled ? "black" : filled === false ? "lightgray" : "gray" }
      />
      {filled === false && (
        <text
          x={Math.min(x1, x2) + Math.abs(x1 - x2) / 2}
          y={Math.min(y1, y2) + Math.abs(y1 - y2) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={0.3}
          fill="red"
        >&times;</text>
      )}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth={0.3}
        stroke="transparent"
        onClick={() => dispatch(toggleLine(id))}
      />
    </>
  )
}
