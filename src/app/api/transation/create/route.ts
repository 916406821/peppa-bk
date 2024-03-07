import NotionServer from '@/lib/NotionServer'
import { NextRequest, NextResponse } from 'next/server'

const notionServer = new NotionServer()

export async function POST(res: NextRequest) {
  let params = await res.json()

  const authorization = res.headers.get('authorization')
  const userId = authorization?.replace('Bearer ', '')

  params = { ...params, userId }

  const data = await notionServer.createTransation(params)
  return NextResponse.json(data, { status: 200 })
}
