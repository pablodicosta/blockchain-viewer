import { Module } from '@nestjs/common';
import { BlocksResolver } from './blocks.resolver';
import { HttpModule } from "@nestjs/axios";
import { BlocksService } from './blocks.service';

@Module({
  imports: [
    HttpModule
  ],
  providers: [
    BlocksResolver,
    BlocksService
  ]
})
export class BlocksModule { }
