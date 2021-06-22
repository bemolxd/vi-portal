import { withUrqlClient } from 'next-urql';
import { Navbar } from '../components/Navbar';
import { Wrapper } from '../components/Wrapper';
import { createUrqlClient } from '../utils/createUrqlClient';

const Index = () => (
  <>
    <Navbar />
    <Wrapper>
      <div>hello viPortal</div>
    </Wrapper>
  </>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
