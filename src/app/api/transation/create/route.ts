import NotionServer from '@/lib/NotionServer'
import { NextRequest, NextResponse } from 'next/server'

const notionServer = new NotionServer()

export async function POST(res: NextRequest) {
  const params = await res.json()

  const data = await notionServer.createTransation(params)
  return NextResponse.json(data, { status: 200 })
}
