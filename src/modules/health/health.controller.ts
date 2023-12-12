import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { HealthService } from './health.service';

@ApiTags('health')
@Controller({
  path: 'health',
  version: '1',
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    description: 'Check if application is working',
  })
  getHealth(): string {
    return this.healthService.getHealth();
  }
}
