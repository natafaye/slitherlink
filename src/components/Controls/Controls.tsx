import { useAppDispatch, solveNextStep } from "../../redux"

type Props = {}

export default function Controls({ }: Props) {
    const dispatch = useAppDispatch()
    return (
        <div>
            <button
                className="bg-stone-100 border border-stone-200 rounded-sm hover:bg-stone-200"
                onClick={() => dispatch(solveNextStep())}
            >💡</button>
        </div>
    )
}