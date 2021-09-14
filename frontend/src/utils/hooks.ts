import { useSubscription } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { GQL_ON_BLOCKS_ADDED } from '../graphql/queries';
import { Block } from '../model/block';
import { initializeApollo } from './apollo';
import 'datejs';

export const useApollo = () =>
  useMemo(() => initializeApollo(), []);

export const useBlockList = (initialValue: Block[]) => {
  const mapBlocksToRows = (block: Block) => [
    block.hash,
    new Date(block.time * 1000).toString('MM/dd/yyyy h:mm:ss tt'),
    block.height
  ];

  const [blocks, setBlocks] = useState(initialValue.map(mapBlocksToRows));
  const { data: { blocksAdded } = { blocksAdded: null }, error } = useSubscription(GQL_ON_BLOCKS_ADDED);

  if (error) {
    console.error('Error retrieving block', error);
  }

  useEffect(() => {
    if (blocksAdded) {
      setBlocks([blocksAdded.flatMap(mapBlocksToRows), ...blocks]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocksAdded])

  return blocks;
}