import { gql } from '@apollo/client';

export const GQL_GET_BLOCKS = gql`
  query GetBlocks {
    blocks {
      hash
      time
      height
    }
  }
`;

export const GQL_GET_BLOCK = gql`
  query GetBlock($hash: String!) {
    block(hash: $hash) {
      size
      block_index
      prev_block
    }
  }
`;

export const GQL_ON_BLOCKS_ADDED = gql`
  subscription OnBlocksAdded {
    blocksAdded {
      hash
      time
      height
    }
  }
`;