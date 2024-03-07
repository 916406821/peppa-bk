import NotionServer from '@/lib/NotionServer'
import { NextRequest, NextResponse } from 'next/server'

const notionServer = new NotionServer()

export async function GET(res: NextRequest) {
  const params = res.nextUrl.searchParams
  const month = params.get('month') ?? undefined

  const authorization = res.headers.get('authorization')
  const userId = authorization?.replace('Bearer ', '')

  const data = await notionServer.queryTransation({ month, userId })
  return NextResponse.json(data, { status: 200 })
}
