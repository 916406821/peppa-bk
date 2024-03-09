import type { Category, GroupTransation, Transation } from '@/types'
import { Skeleton } from 'antd'
import dayjs from 'dayjs'
import IconPark from './IconPark'

interface Prop {
  loading: boolean
  list: GroupTransation[]
  tags: Category[]
  onClick: (value: Transation) => void
}

export default function List({ list, loading, tags, onClick }: Prop) {
  return (
    <div className="no-scrollbar mx-auto mt-4 box-border grid h-full w-11/12 grow overflow-y-auto rounded-t-3xl bg-bg-200 px-4 py-5">
      <div className="mb-10">
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
            <div className="mb-6 w-full text-sm text-text-100" key={item.date}>
              <div className="flex w-full justify-between text-text-200">
                <div>
                  {item.date} {dayjs(item.date).format('dddd')}
                </div>
                <div>
                  收入：{item.incomeTotal} 支出：{item.outcomeTotal}
                </div>
              </div>
              {item.list.map((it, index) => {
                const tag = tags.find((tag) => tag.id === it.category.id)
                return (
                  <div
                    className="flex w-full justify-between pt-4 active:bg-bg-200"
                    key={index}
                    onClick={() => onClick(it)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-100">
                        <IconPark className="text-primary-100" href={tag?.icon} />
                      </div>
                      <div>{it.note || tag?.name}</div>
                    </div>
                    <div>{it.amount}</div>
                  </div>
                )
              })}
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-text-200">
            没有记账记录
          </div>
        )}
      </div>
    </div>
  )
}
