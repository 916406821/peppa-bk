import NotionServer from '@/lib/NotionServer'
import { NextRequest, NextResponse } from 'next/server'

const notionServer = new NotionServer()

export async function GET() {
  const data = await notionServer.queryTransation()
  return NextResponse.json(data)
}
