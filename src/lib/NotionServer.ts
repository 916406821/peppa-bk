import { Client } from '@notionhq/client'

const auth = process.env.NOTION_ACCESS_TOKEN

const user_id = process.env.NOTION_DATABASE_USER_ID ?? '' // 用户表
const category_id = process.env.NOTION_DATABASE_CATEGORY_ID ?? '' // 账目类别表
const transation_id = process.env.NOTION_DATABASE_TRANSATION_ID ?? '' // 账目记录表

type Result = any

export default class NotionService {
  client: Client

  constructor() {
    this.client = new Client({ auth })
  }

  /**
   * 查询用户
   */
  async queryUser(): Promise<Result[]> {
    const response = await this.client.databases.query({
      database_id: user_id,
    })

    return response.results.map((item) => NotionService.transformer(item))
  }

  /**
   * 查询账目类别
   */
  async queryCategory(): Promise<Result[]> {
    const response = await this.client.databases.query({
      database_id: category_id,
    })

    return response.results.map((item) => NotionService.transformer(item))
  }

  /**
   * 查询账目记录
   */
  async queryTransation(): Promise<Result[]> {
    const response = await this.client.databases.query({
      database_id: transation_id,
      sorts: [{ property: 'date', direction: 'descending' }],
    })

    const data = response.results
      .map((item) => NotionService.transformer(item))
      .reduce((acc, cur) => {
        const key = cur.date
        const index = acc.findIndex((item: any) => item.date === key)

        if (acc.length > 0 && index > -1) {
          acc[index].list.push(cur)
        } else {
          acc.push({ date: key, list: [cur] })
        }
        return acc
      }, [])

    data.forEach((item: any) => {
      const { list } = item
      let incomeTotal = 0
      let outcomeTotal = 0
      list.forEach((item: any) => {
        if (item.amount > 0) {
          incomeTotal += item.amount
        } else {
          outcomeTotal += item.amount * -1
        }
      })
      item.incomeTotal = incomeTotal
      item.outcomeTotal = outcomeTotal
    })

    return data
  }

  /**
   * 转换Notion数据格式
   * @param page
   * @returns
   */
  private static transformer(page: any) {
    let data: any = {}

    for (const key in page.properties) {
      switch (page.properties[key].type) {
        case 'relation':
          if (page.properties[key].relation[0]) data[key] = page.properties[key].relation[0]?.id
          break
        case 'unique_id':
          data[key] = page.properties[key].id
          break
        case 'title':
        case 'rich_text':
          data[key] = page.properties[key][page.properties[key].type][0].text.content
          break
        case 'email':
          data[key] = page.properties[key].email
          break
        case 'date':
          data[key] = page.properties[key].date?.start
          break
        case 'number':
          data[key] = page.properties[key].number
          break
        case 'select':
          data[key] = page.properties[key].select
          break
        default:
          data[key] = page.properties[key]
          break
      }
    }

    return data
  }
}
