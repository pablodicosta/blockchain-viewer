import { Args, Resolver, Query, Subscription } from '@nestjs/graphql';
import { Block } from './block.model';
import { BlocksService } from './blocks.service';

@Resolver(() => Block)
export class BlocksResolver {
  constructor(
    private blocksService: BlocksService
  ) { }

  @Query(() => Block, { nullable: true })
  async block(@Args('hash') hash: string) {
    return this.blocksService.getBlock(hash);
  }

  @Query(() => [Block])
  async blocks() {
    return this.blocksService.getBlocks();
  }

  @Subscription(() => [Block])
  blocksAdded() {
    return this.blocksService.pubSub.asyncIterator('blocksAdded');
  }
}