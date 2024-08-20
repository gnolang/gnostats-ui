import { IHomeProps } from './home.types.ts';
import { FC } from 'react';
import {
  Container,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text
} from '@chakra-ui/react';
import Card from '../../atoms/Card/Card.tsx';
import { BiCube } from 'react-icons/bi';
import { GoHourglass } from 'react-icons/go';
import { PiSpeedometer } from 'react-icons/pi';
import { IoPricetagsOutline } from 'react-icons/io5';
import { SlPuzzle } from 'react-icons/sl';
import { PiNetworkLight } from 'react-icons/pi';
import Graph from '../../atoms/Graph/Graph.tsx';
import Proposers from '../../atoms/Proposers/Proposers.tsx';
import { PiGraphLight } from 'react-icons/pi';
import { CiCircleCheck } from 'react-icons/ci';
import { FaPeopleGroup } from 'react-icons/fa6';
import { FaVoteYea } from 'react-icons/fa';
import { PiCircleNotchThin } from 'react-icons/pi';
import { ImCheckmark2 } from 'react-icons/im';
import { RxCross2 } from 'react-icons/rx';

const Home: FC<IHomeProps> = () => {
  return (
    <Container maxWidth={'9xl'} width={'100%'}>
      <Flex flexWrap={'wrap'} width={'100%'}>
        <Card
          name={'Best block'}
          color={'#8be9fd'}
          icon={<BiCube color={'#8be9fd'} size={'70px'} />}
          value={'#20,569,737'}
        />
        <Card
          name={'Last block'}
          color={'#50fa7b'}
          icon={<GoHourglass color={'#50fa7b'} size={'70px'} />}
          value={'10 s ago'}
        />
        <Card
          name={'Avg block time'}
          color={'#50fa7b'}
          icon={<PiSpeedometer color={'#50fa7b'} size={'70px'} />}
          value={'12.00 s'}
        />
        <Card
          name={'Gas fee'}
          color={'#8be9fd'}
          icon={<IoPricetagsOutline color={'#8be9fd'} size={'70px'} />}
          value={'1 gnot'}
        />
        <Card
          name={'Gas limit'}
          color={'#bd93f9'}
          icon={<SlPuzzle color={'#bd93f9'} size={'70px'} />}
          value={'30000000'}
        />
        <Card
          name={'Active nodes'}
          color={'#50fa7b'}
          icon={<PiNetworkLight color={'#50fa7b'} size={'70px'} />}
          value={'7/7'}
        />
      </Flex>

      <Flex flexWrap={'wrap'} width={'100%'}>
        <Graph
          name={'Block times'}
          icon={<GoHourglass color={'#50fa7b'} size={'35px'} />}
        />

        <Graph
          name={'Transactions'}
          icon={<PiGraphLight color={'#f1fa8c'} size={'35px'} />}
        />

        <Graph
          name={'Gas used'}
          icon={<IoPricetagsOutline color={'#8be9fd'} size={'35px'} />}
        />

        <Graph
          name={'Gas limit'}
          icon={<IoPricetagsOutline color={'#8be9fd'} size={'35px'} />}
        />

        <Proposers
          proposers={[
            '40dbda9109d48d9dbbe87633c6211a192a090dcc',
            '40dbda9109d48d9dbbe87633c6211a192a090dcc',
            '40dbda9109d48d9dbbe87633c6211a192a090dcc'
          ]}
        />
      </Flex>

      <Flex mt={4} width={'100%'}>
        <TableContainer width={'100%'}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>
                  <CiCircleCheck size={25} color={'#888'} />
                </Th>
                <Th>
                  <PiNetworkLight size={25} color={'#888'} />
                </Th>
                <Th>
                  <FaVoteYea size={25} color={'#888'} />
                </Th>
                <Th isNumeric>
                  <FaPeopleGroup size={25} color={'#888'} />
                </Th>
                <Th isNumeric>
                  <PiGraphLight size={25} color={'#888'} />
                </Th>
                <Th isNumeric>
                  <GoHourglass size={25} color={'#888'} />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <PiCircleNotchThin size={25} color={'#50fa7b'} />
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    example-example
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    <ImCheckmark2 size={20} color={'#50fa7b'} />
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    50
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    5000
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    2s ago
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <PiCircleNotchThin size={25} color={'#50fa7b'} />
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    example-example
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    <ImCheckmark2 size={20} color={'#50fa7b'} />
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    50
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    5000
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    2s ago
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  <PiCircleNotchThin size={25} color={'#50fa7b'} />
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    example-example
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    <RxCross2 size={20} color={'#888'} />
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    50
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    5000
                  </Text>
                </Td>
                <Td>
                  <Text color={'#50fa7b'} fontSize={'sm'}>
                    2s ago
                  </Text>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Container>
  );
};

export default Home;
