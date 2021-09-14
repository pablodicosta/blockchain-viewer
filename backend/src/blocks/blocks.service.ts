import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Interval } from '@nestjs/schedule';
import { Block } from './block.model';
import { map, Observable } from 'rxjs';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class BlocksService {

  private latestBlocks: Block[];
  public pubSub: PubSub;

  constructor(
    private http: HttpService
  ) {
    this.latestBlocks = [];
    this.pubSub = new PubSub();
  }

  getBlock(hash: string): Observable<Block> {
    return this.http.get(`https://blockchain.info/rawblock/${hash}`).pipe(
      map(response => response.data)
    );
  }

  getBlocks(): Observable<Block[]> {
    return this.http.get(`https://blockchain.info/blocks/${Date.now()}?format=json`).pipe(
      map(response => response.data)
    );
  }

  @Interval(20000)
  private getNewBlocks() {
    try {
      this.getBlocks().forEach((blocks) => {
        const blocksAdded = blocks.filter(block1 =>
          !this.latestBlocks.some(block2 =>
            block1.hash === block2.hash
          )
        );

        if (blocksAdded.length && this.latestBlocks.length) {
          console.log(`[${new Date()}] ${blocksAdded.length} new block(s) found`);
          console.log(blocksAdded);
          this.pubSub.publish('blocksAdded', { blocksAdded })
        }

        this.latestBlocks = blocks;
      });
    } catch (err) {
      console.error(`[${new Date()}] ERROR: ${err}`);
    }
  }
}