import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { LogAction } from 'utils/enum';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Log)
    private readonly logsRepository: Repository<Log>,
  ) {}

  public async createLog(data: {
    action: LogAction;
    userId?: string;
    entity: string;
    entityId?: string;
    metadata?: Record<string, any>;
  }) {
    const log = this.logsRepository.create(data);
    return this.logsRepository.save(log);
  }
}
