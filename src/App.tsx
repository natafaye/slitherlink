import Board from "./components/Board";
import Controls from "./components/Controls/Controls";

export default function App() {
  return (
    <div className="m-2">
      <h3 className="font-bold text-4xl">Slitherlink</h3>
      <Controls/>
      <Board/>
    </div>
  )
}