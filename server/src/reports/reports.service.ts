import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingService } from 'src/booking/booking.service';
import { Response } from 'express';
import { Document, Packer, Paragraph, TextRun } from 'docx';

@Injectable()
export class ReportsService {
  constructor(private bookingService: BookingService) {}

  async generateBookingReportDOCX(id: number, res: Response) {
    const booking = await this.bookingService.getBookingById(id);

    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    const { createdAt, host, user } = booking;
    const bookingDate = new Date(createdAt).toLocaleDateString(); // Преобразуем дату в нужный формат

    // Создание документа
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun('Отчет о бронировании'),
                new TextRun({
                  text: `\nДата бронирования: ${bookingDate}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Имя пользователя: ${user.name} ${user.surname}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Хост: ${host.city}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Адрес хоста: ${host.address}`,
                  bold: true,
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Генерация документа в формате буфера
    const buffer = await Packer.toBuffer(doc);

    // Отправка документа как файла в ответе
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=booking_report.docx',
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    );
    res.send(buffer);
  }
}
