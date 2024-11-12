import NotionServer from '@/lib/NotionServer'
import { NextRequest, NextResponse } from 'next/server'

const notionServer = new NotionServer()

// 辅助函数，用于获取 userId
const getUserId = (res: NextRequest) => {
  const authorization = res.headers.get('authorization')
  return authorization?.replace('Bearer ', '')
}

export async function GET(res: NextRequest) {
  const params = res.nextUrl.searchParams
  const month = params.get('month') ?? undefined
  const userId = getUserId(res)

  const data = await notionServer.queryTransaction({ month, userId })
  return NextResponse.json(data, { status: 200 })
}

export async function POST(res: NextRequest) {
  let params = await res.json()
  const userId = getUserId(res)

  params = { ...params, userId }
  const data = await notionServer.createTransaction(params)
  return NextResponse.json(data, { status: 200 })
}

export async function PUT(res: NextRequest) {
  let params = await res.json()
  const userId = getUserId(res)

  const { params: ps, pageId } = params
  const data = await notionServer.updateTransaction({ params: { ...ps, userId }, pageId })
  return NextResponse.json(data, { status: 200 })
}

export async function DELETE(res: NextRequest) {
  let params = await res.json()
  const userId = getUserId(res)

  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const data = await notionServer.removeTransaction(params)
  return NextResponse.json(data, { status: 200 })
}
