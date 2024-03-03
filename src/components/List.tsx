import { tagIcons, type GroupTransaction } from '@/app/page'
import { Skeleton } from 'antd'

export type Category = {
  id: string
  categoryName: string
  categoryType: {
    id: string
    name: 'income' | 'outcome'
  }
}

interface Prop {
  loading: boolean
  list: GroupTransaction[]
}

export default function List({ list, loading }: Prop) {
  return (
    <div className="bg-bg-200 rounded-3xl p-4 mt-4 w-11/12 grow mx-auto flex justify-start flex-col items-center">
      {loading ? (
        <>
          <Skeleton loading={loading} avatar active />
          <Skeleton loading={loading} avatar active />
          <Skeleton loading={loading} avatar active />
          <Skeleton loading={loading} avatar active />
          <Skeleton loading={loading} avatar active />
          <Skeleton loading={loading} avatar active />
        </>
      ) : list.length > 0 ? (
        list.map((item) => (
          <div className="w-full mb-6 text-text-100" key={item.date}>
            <div className="w-full flex justify-between text-sm text-text-200">
              <div>{item.date} 星期四</div>
              <div>
                收入：{item.incomeTotal} 支出：{item.outcomeTotal}
              </div>
            </div>
            {item.list.map((it, index) => (
              <div className="w-full pt-6 flex justify-between" key={index}>
                <div className="flex gap-2 items-center">
                  <div className="rounded-full bg-primary-100 flex items-center justify-center w-10 h-10">
                    {tagIcons()[it.category.name]}
                  </div>
                  <div>{it.note}</div>
                </div>
                <div>{it.amount}</div>
              </div>
            ))}
          </div>
        ))
      ) : (
        '暂无数据'
      )}
    </div>
  )
}
