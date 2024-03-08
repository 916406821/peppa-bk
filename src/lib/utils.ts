import { GroupTransation, Transation } from "@/types"
import BigNumber from "bignumber.js"

export function getGroupList(list: Transation[]) {
  const groupMap = new Map<string, GroupTransation>()
  let monthIncomeTotal = '0'
  let monthOutcomeTotal = '0'

  list.forEach((item) => {
    const { date, amount } = item
    const key = date

    if (groupMap.has(key)) {
      const group = groupMap.get(key)!
      group.list.push(item)
      if (amount > 0) {
        group.incomeTotal = new BigNumber(group.incomeTotal).plus(amount).toString()
      } else {
        group.outcomeTotal = new BigNumber(group.outcomeTotal).minus(amount).toString()
      }
    } else {
      groupMap.set(key, {
        date: key,
        list: [item],
        incomeTotal: Math.abs(Math.max(amount, 0)).toString(),
        outcomeTotal: Math.abs(Math.min(amount, 0)).toString(),
      })
    }

    if (amount > 0) {
      monthIncomeTotal = new BigNumber(monthIncomeTotal).plus(amount).toString()
    } else {
      monthOutcomeTotal = new BigNumber(monthOutcomeTotal).minus(amount).toString()
    }
  })

  return {
    groupList: Array.from(groupMap.values()),
    monthIncomeTotal,
    monthOutcomeTotal,
  }
}