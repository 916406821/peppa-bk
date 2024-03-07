import { Category, CreateTransationParams, Transation } from '@/types'
import { Client } from '@notionhq/client'
import dayjs from 'dayjs'

const auth = process.env.NOTION_ACCESS_TOKEN

const user_id = process.env.NOTION_DATABASE_USER_ID ?? '' // 用户表
const category_id = process.env.NOTION_DATABASE_CATEGORY_ID ?? '' // 账目类别表
const transation_id = process.env.NOTION_DATABASE_TRANSATION_ID ?? '' // 账目记录表

type LoginParams = {
  username: string
  password: string
}

type Success = {
  success: boolean
  message: string
  data?: any
}

type Result = any

export default class NotionService {
  client: Client

  constructor() {
    this.client = new Client({ auth })
  }

  /**
   * 登录
   */
  async login(params: LoginParams): Promise<Success> {
    try {
      const response = await this.client.databases.query({
        database_id: user_id,
        filter: {
          and: [
            {
              property: 'username',
              title: {
                equals: params.username,
              },
            },
            {
              property: 'password',
              rich_text: {
                equals: params.password,
              },
            },
          ],
        },
      })

      const data = response.results as any

      if (data && data.length > 0) {
        return {
          success: true,
          message: '登录成功',
          data: {
            id: data[0].id,
            username: data[0].properties.username.title[0].plain_text,
            email: data[0].properties.email.email,
          },
        }
      }

      return {
        success: false,
        message: '用户名或密码错误',
      }
    } catch (error) {
      console.error(error)
      return {
        success: false,
        message: '登录失败',
      }
    }
  }

  /**
   * 查询用户
   */
  async queryUser(userId?: string): Promise<Result> {
    try {
      if (!userId) {
        return {
          success: false,
        }
      }

      const response = await this.client.pages.retrieve({
        page_id: userId,
      })

      return {
        success: true,
        data: response,
      }
    } catch (error) {
      console.error(error)
      return {
        success: false,
      }
    }
  }

  /**
   * 查询账目类别
   */
  async queryCategory(): Promise<Result> {
    try {
      const response = await this.client.databases.query({
        database_id: category_id,
      })

      const categorys: Category[] = []

      response?.results?.forEach((page: any) => {
        categorys.push({
          id: page.id,
          name: page.properties.name.title[0].plain_text,
          type: page.properties.type.select.name,
          icon: page.properties.icon.rich_text[0].plain_text,
        })
      })

      return categorys
    } catch (error) {
      console.error(error)
      return []
    }
  }

  /**
   * 创建账目类别
   */
  async createCategory(params: Category): Promise<Result> {
    try {
      const response = await this.client.pages.create({
        parent: { database_id: category_id },
        properties: {
          name: {
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: params.name,
                },
              },
            ],
          },
          type: {
            type: 'select',
            select: {
              name: params.type,
            },
          },
        },
      })

      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }

  /**
   * 查询账目记录
   */
  async queryTransation({
    month,
    userId,
  }: {
    month?: string
    userId?: string
  }): Promise<Transation[]> {
    let filterOptions

    if (!userId) {
      return []
    }

    if (month) {
      const startDate = dayjs(month).startOf('month').format('YYYY-MM-DD')
      const endDate = dayjs(month).endOf('month').format('YYYY-MM-DD')
      filterOptions = {
        and: [
          {
            property: 'user',
            relation: {
              contains: userId,
            },
          },
          {
            property: 'date',
            date: {
              on_or_after: startDate,
            },
          },
          {
            property: 'date',
            date: {
              on_or_before: endDate,
            },
          },
        ],
      }
    }

    try {
      const response = await this.client.databases.query({
        database_id: transation_id,
        sorts: [{ property: 'date', direction: 'descending' }],
        filter: filterOptions,
      })

      const transations: Transation[] = []

      response?.results?.forEach((page: any) => {
        transations.push({
          id: page.id,
          userId: page.properties.user.relation[0].id,
          category: page.properties.category.relation[0],
          amount: page.properties.amount.number,
          date: page.properties.date.date.start,
          note: page.properties.note.title[0].plain_text,
        })
      })
      return transations
    } catch (error) {
      console.error(error)
      return []
    }
  }

  /**
   * 创建账目记录
   */
  async createTransation(params: CreateTransationParams): Promise<Result> {
    try {
      const response = await this.client.pages.create({
        parent: { database_id: transation_id },
        properties: {
          category: {
            type: 'relation',
            relation: [
              {
                id: params.category.id,
              },
            ],
          },
          amount: {
            type: 'number',
            number: params.amount,
          },
          date: {
            type: 'date',
            date: {
              start: params.date,
            },
          },
          user: {
            type: 'relation',
            relation: [
              {
                id: params.userId,
              },
            ],
          },
          note: {
            type: 'title',
            title: [
              {
                type: 'text',
                text: {
                  content: params.note,
                },
              },
            ],
          },
        },
      })

      return response
    } catch (error) {
      console.error(error)
      return []
    }
  }
}
