import Head from 'next/head'
import Container from '@components/Container';
import Layout from '@components/Layout';
import SideMenu from '@components/SideMenu';
import Main from '@components/Main';
import SideColumn from '@components/SideColumn';

export default function Home() {
  return (
    <Layout>
      <Container>
        <div className='flex py-8 items-start'>
          <SideMenu />
          <Main />
          <SideColumn />
        </div>
      </Container>
    </Layout>
  )
}
