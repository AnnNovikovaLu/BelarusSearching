import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('/booking/:id/pdf')
  async getFavoritesMoviesPdf(
    @Param('id') id,
    @Res() res: Response,
    @Req() req,
  ) {
    return this.reportsService.generateBookingReportPdf(id, res);
  }
}
