import { Entity } from 'typeorm';
import { AccountEntity } from '../../common';

/**
 * 数据实体
 */
@Entity()
export class User extends AccountEntity {}
