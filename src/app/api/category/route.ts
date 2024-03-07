import NotionServer from '@/lib/NotionServer'
import { NextResponse } from 'next/server'

const notionServer = new NotionServer()

export async function GET() {
  const data = await notionServer.queryCategory()
  return NextResponse.json(data, { status: 200 })
}
