import { NextResponse } from "next/server"
import { HTTP_RESPONSES } from "../../../definitions/HttpDefinitions"
import { mockStations } from "@/lib/mock_data"

export async function GET(req: any) {

  try {
    return NextResponse.json(HTTP_RESPONSES[200](mockStations))
  } catch (error) {
    return NextResponse.json(HTTP_RESPONSES[500](error.message))
  }
}