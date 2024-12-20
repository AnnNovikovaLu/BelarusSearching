import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('/booking/:id/docx')
  async getFavoritesMoviesPdf(
    @Param('id') id,
    @Res() res: Response,
    @Req() req,
  ) {
    return this.reportsService.generateBookingReportDOCX(id, res);
  }
}
