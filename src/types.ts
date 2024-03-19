type User = {
  id: string
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

type CreateTransationParams = {
  category: Category
  amount: number
  date: string
  userId: string
  note: string
}

type Transation = {
  id: string
  category: Category
  amount: number
  date: string
  userId: string
  note: string
}

type GroupTransation = {
  date: string
  list: Transation[]
  incomeTotal: string
  outcomeTotal: string
}

type Budget = {
  year_budget: number
  month_budget: number
}

export type { Budget, Category, CreateTransationParams, GroupTransation, Transation, User, UserInfo }

