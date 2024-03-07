import NotionServer from '@/lib/NotionServer'
import { NextRequest, NextResponse } from 'next/server'

const notionServer = new NotionServer()

export async function GET(res: NextRequest) {
  const params = res.nextUrl.searchParams
  const userId = params.get('userId') ?? undefined

  const data = await notionServer.queryUser(userId)
  return NextResponse.json(data, { status: 200 })
}
