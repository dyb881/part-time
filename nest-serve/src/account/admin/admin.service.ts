import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountAdminPaginationQueryDto, AccountAdminCreateDto, AccountAdminUpdateDto } from './admin.dto';
import { AccountAdmin } from './admin.entity';
import { TransformInstanceToPlain } from 'class-transformer';

@Injectable()
export class AccountAdminService {
  constructor(@InjectRepository(AccountAdmin) private readonly repository: Repository<AccountAdmin>) {}
}
