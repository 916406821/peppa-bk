export default function Total() {
  return (
    <div className="bg-primary-100 text-primary-300 rounded-lg p-4 mt-4 w-5/6 mx-auto flex justify-around items-center">
      <div className="flex flex-col gap-1">
        <div>2024年</div>
        <div className="text-2xl">3月</div>
      </div>
      <div className="w-px h-8 bg-black"></div>
      <div className="flex flex-col gap-3">
        <div>收入</div>
        <div>4567.0</div>
      </div>
      <div className="flex flex-col gap-3">
        <div>支出</div>
        <div>0.0</div>
      </div>
    </div>
  )
}
