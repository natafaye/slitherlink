type Props = {
    location: [number, number]
}
export default function BoardDot({ location: [cx, cy] }: Props) {
  return (
    <circle cx={cx} cy={cy} r={0.06} fill="black"/>
  )
}