import { Controller } from '@nestjs/common';
import { HostService } from './host.service';

@Controller('hosts')
export class HostController {
  constructor(private readonly hostService: HostService) {}
}
