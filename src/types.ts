type User = {
  id: string
  username: string
  password: string
  email: string
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
  incomeTotal: number
  outcomeTotal: number
}

export type { Category, CreateTransationParams, GroupTransation, Transation, User, UserInfo }

