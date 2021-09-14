import { GetServerSideProps } from 'next';
import { useRouter } from 'next/dist/client/router';
import Nav from '../components/Nav';
import Table from '../components/Table';
import { GQL_GET_BLOCKS } from '../graphql/queries';
import { Block } from '../model/block';
import { initializeApollo } from '../utils/apollo';
import { useBlockList } from '../utils/hooks';

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  const { data: { blocks } } = await apolloClient.query({
    query: GQL_GET_BLOCKS,
    fetchPolicy: 'no-cache'
  });

  return {
    props: {
      blocks
    }
  }
}

const Home = ({ blocks }: { blocks: Block[] }) => {
  const columnHeaders = ['Hash', 'Time', 'Height'];
  const rows = useBlockList(blocks);
  const rowsPerPage = 13;
  const router = useRouter();
  const onRowClick = (row: any[]) => router.push(`block/${row[0]}`);

  return (
    <>
      <Nav />
      <div className="pt-32 px-32">
        <Table {...{ columnHeaders, rows, rowsPerPage, onRowClick }} />
      </div>
    </>
  );
}

export default Home;
