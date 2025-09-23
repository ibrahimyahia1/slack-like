import { PartialType } from '@nestjs/mapped-types';
import { CreateStaredMessageDto } from './create-stared-message.dto';

export class UpdateStaredMessageDto extends PartialType(CreateStaredMessageDto) {}
