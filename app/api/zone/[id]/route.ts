import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { mockZones } from "@/lib/mock_data";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
      const zoneId = parseInt(params.id);

      const zone = mockZones.find(z => z.id === zoneId);
  
      if (!zone) {
        return NextResponse.json(HTTP_RESPONSES[404]("Zone"));
      }
      
      return NextResponse.json(HTTP_RESPONSES[200](zone));
    } catch (error: any) {
      return NextResponse.json(HTTP_RESPONSES[500](error.message));
    }
  }