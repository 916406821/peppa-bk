import NotionServer from '@/lib/NotionServer'
import { NextRequest, NextResponse } from 'next/server'

const notionServer = new NotionServer()

export async function POST(res: NextRequest) {
  let params = await res.json()

  const authorization = res.headers.get('authorization')
  const userId = authorization?.replace('Bearer ', '')
  if (!userId) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const data = await notionServer.removeTransation(params)
  return NextResponse.json(data, { status: 200 })
}
