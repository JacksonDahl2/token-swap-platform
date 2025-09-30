import logger from "@/server/logger";
import settings from "@/server/settings";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const _settings = settings();

  if (_settings instanceof Error) {
    logger.error('Invalid settings', _settings)
    throw new Error(_settings.message)
  }
  logger.info('Getting price information')

   
}