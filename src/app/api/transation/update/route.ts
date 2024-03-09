import NotionServer from '@/lib/NotionServer'
import { NextRequest, NextResponse } from 'next/server'

const notionServer = new NotionServer()

export async function POST(res: NextRequest) {
  let params = await res.json()

  const authorization = res.headers.get('authorization')
  const userId = authorization?.replace('Bearer ', '')

  const { params: ps, pageId } = params

  const data = await notionServer.updateTransation({ params: { ...ps, userId }, pageId })
  return NextResponse.json(data, { status: 200 })
}
