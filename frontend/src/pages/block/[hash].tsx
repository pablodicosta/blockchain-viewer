import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { GQL_GET_BLOCK } from '../../graphql/queries';
import { Block } from '../../model/block';
import { initializeApollo } from '../../utils/apollo';
import Link from 'next/link'
import Nav from '../../components/Nav';

export const getServerSideProps: GetServerSideProps =
  async ({ params }): Promise<GetServerSidePropsResult<{ block: Block | null; hash: string | string[] | undefined; }>> => {
    const apolloClient = initializeApollo();
    const { data: { block } } = await apolloClient.query({
      query: GQL_GET_BLOCK,
      variables: {
        hash: params?.hash
      }
    });

    return {
      props: {
        block,
        hash: params?.hash
      }
    }
  }

const BlockDetails = ({ block, hash }: { block: Block, hash: string }) => (
  <>
    <Nav />
    <div className="p-40">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Block Details</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Hash {hash}</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Previous block hash</dt>
              <dd className="mt-1 text-sm text-indigo-600 hover:text-indigo-500 hover:cursor-pointer sm:mt-0 sm:col-span-2">
                <Link href={`/block/${block.prev_block}`}>{block.prev_block}</Link>
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Block index</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{block.block_index}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Block size</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{block.size} bytes</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </>
);

export default BlockDetails;