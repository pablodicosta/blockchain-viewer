import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { BlocksModule } from './blocks/blocks.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      installSubscriptionHandlers: true
    }),
    ScheduleModule.forRoot(),
    BlocksModule
  ]
})
export class AppModule { }
