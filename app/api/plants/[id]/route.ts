import { HTTP_RESPONSES } from "@/definitions/HttpDefinitions";
import { initialPlantGroups, mockZones } from "@/lib/mock_data";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const plantId = parseInt(params.id);
    
        const plant = initialPlantGroups
          .flatMap(group => group.plants) 
          .find(plant => plant.id === plantId);  
    
        if (!plant) {
          return NextResponse.json(HTTP_RESPONSES[404]("Plant"));
        }
    
        return NextResponse.json(HTTP_RESPONSES[200](plant));
      } catch (error: any) {
        return NextResponse.json(HTTP_RESPONSES[500](error.message));
      }
  }