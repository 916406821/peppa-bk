type User = {
  id: string
  nickname: string
  username: string
  password: string
  email: string
  month_budget: number
  year_budget: number
}

type UserInfo = Omit<User, 'password'>

type Category = {
  id: string
  name: string
  icon: string
  type: 'income' | 'outcome'
}

type CreateTransactionParams = {
  category: Category
  amount: number
  date: string
  userId: string
  note: string
}

type Transaction = {
  id: string
  category: Category
  amount: number
  date: string
  userId: string
  note: string
}

type GroupTransaction = {
  date: string
  list: Transaction[]
  incomeTotal: string
  outcomeTotal: string
}

type Budget = {
  year_budget: number
  month_budget: number
}

export type { Budget, Category, CreateTransactionParams, GroupTransaction, Transaction, User, UserInfo }

