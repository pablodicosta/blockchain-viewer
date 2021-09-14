import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Block {
  @Field()
  hash: string;

  @Field({ nullable: true })
  prev_block: string;

  @Field(() => Int)
  height: number;

  @Field(() => Int)
  time: number;

  @Field(() => Int)
  block_index: number;

  @Field(() => Int, { nullable: true })
  size: number;
}