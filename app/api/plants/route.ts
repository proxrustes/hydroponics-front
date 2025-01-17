import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { initialPlantGroups } from "@/lib/mock_data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
      return NextResponse.json(HTTP_RESPONSES[200](initialPlantGroups));
    } catch (error: any) {
      return NextResponse.json(HTTP_RESPONSES[500](error.message));
    }
  }