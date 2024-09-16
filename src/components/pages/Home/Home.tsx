import { IHomeProps, INodeInfo } from './home.types.ts';
import { FC, useEffect, useReducer, useState } from 'react';
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
  Text,
  Tooltip,
  Box
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
import { CiHashtag } from 'react-icons/ci';
import { GoArrowSwitch } from 'react-icons/go';
import { ImCross } from 'react-icons/im';
import { DataPoint } from '../../../proto/stats.ts';
import Long from 'long';

type DataPointAction = {
  type: 'NEW_DATAPOINT';
  payload: {
    id: string;
    data: DataPoint;
  };
};

type Action = DataPointAction;

const nodeReducer = (state: Map<string, DataPoint>, action: Action) => {
  const newState = new Map<string, DataPoint>(state);

  switch (action.type) {
    case 'NEW_DATAPOINT':
      newState.set(action.payload.id, {
        ...newState.get(action.payload.id), // keeps existing data
        ...action.payload.data // merges new data
      });

      return newState;
    default:
      return state;
  }
};

const Home: FC<IHomeProps> = () => {
  const infos: DataPoint[] = [
    {
      dynamic_info: {
        address: 'id-1',
        moniker: 'node-1',
        is_validator: true,
        net_info: {
          p2p_address: 'g1239081238:12312',
          peers: [
            {
              p2p_address: 'g1239081238:12312',
              moniker: 'node-X'
            }
          ]
        },
        pending_txs: new Long(20),
        block_info: {
          number: new Long(20657283),
          timestamp: new Long(1726479433),
          gas_used: new Long(1000),
          gas_wanted: new Long(1000),
          proposer: 'g11291923121231212'
        }
      },
      static_info: {
        address: 'id-1',
        gno_version: 'v0.2.0',
        os_version: 'Windows XP'
      }
    },
    {
      dynamic_info: {
        address: 'id-2',
        moniker: 'node-2',
        is_validator: true,
        net_info: {
          p2p_address: 'g1239081238:12312',
          peers: [
            {
              p2p_address: 'g1239081238:12312',
              moniker: 'node-X'
            }
          ]
        },
        pending_txs: new Long(20),
        block_info: {
          number: new Long(20657283),
          timestamp: new Long(1726479433),
          gas_used: new Long(1000),
          gas_wanted: new Long(1000),
          proposer: 'g11291923121231212'
        }
      },
      static_info: {
        address: 'id-2',
        gno_version: 'v0.2.0',
        os_version: 'Windows XP'
      }
    },
    {
      dynamic_info: {
        address: 'id-3',
        moniker: 'node-3',
        is_validator: true,
        net_info: {
          p2p_address: 'g1239081238:12312',
          peers: [
            {
              p2p_address: 'g1239081238:12312',
              moniker: 'node-X'
            }
          ]
        },
        pending_txs: new Long(20),
        block_info: {
          number: new Long(20657283),
          timestamp: new Long(1726479433),
          gas_used: new Long(1000),
          gas_wanted: new Long(1000),
          proposer: 'g11291923121231212'
        }
      },
      static_info: {
        address: 'id-3',
        gno_version: 'v0.2.0',
        os_version: 'Windows XP'
      }
    }
  ];

  const [nodes, dispatch] = useReducer(
    nodeReducer,
    new Map<string, DataPoint>()
  );

  const [displayedInfo, setDisplayedInfo] = useState<DataPoint[]>([]);

  useEffect(() => {
    setDisplayedInfo([...nodes.values()]);
  }, [nodes]);

  useEffect(() => {
    for (const info of infos) {
      dispatch({
        type: 'NEW_DATAPOINT',
        payload: {
          id: info.static_info?.address as string,
          data: info as DataPoint
        }
      });
    }
  }, []);

  const getLastUpdateTime = (timestamp: Long): number => {
    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime - timestamp.toNumber();
  };

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
            'g1t9ctfa468hn6czff8kazw08crazehcxaqa2uaa',
            'g1t9ctfa468hn6czff8kazw08crazehcxaqa2uaa',
            'g1t9ctfa468hn6czff8kazw08crazehcxaqa2uaa'
          ]}
        />
      </Flex>

      <Flex mt={4} width={'100%'}>
        <TableContainer width={'100%'}>
          <Table variant={'simple'} size={'sm'}>
            <Thead>
              <Tr>
                <Th>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Pin node'}
                    aria-label={'Pin node'}
                  >
                    <Box display={'flex'}>
                      <CiCircleCheck size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>

                <Th>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Moniker'}
                    aria-label={'Moniker'}
                  >
                    <Box display={'flex'}>
                      <PiNetworkLight size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>
                <Th>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Validating'}
                    aria-label={'Validating'}
                  >
                    <Box display={'flex'}>
                      <FaVoteYea size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>
                <Th isNumeric>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Peers'}
                    aria-label={'Peers'}
                  >
                    <Box display={'flex'}>
                      <FaPeopleGroup size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>
                <Th isNumeric>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Pending transactions'}
                    aria-label={'Pending transactions'}
                  >
                    <Box display={'flex'}>
                      <PiGraphLight size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>
                <Th isNumeric>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Last block'}
                    aria-label={'Last block'}
                  >
                    <Box display={'flex'}>
                      <BiCube size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>
                <Th>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Block hash'}
                    aria-label={'Block hash'}
                  >
                    <Box display={'flex'}>
                      <CiHashtag size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>
                <Th>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Block transactions'}
                    aria-label={'Block transactions'}
                  >
                    <Box display={'flex'}>
                      <GoArrowSwitch size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>
                <Th>
                  <Tooltip
                    placement={'top-start'}
                    bg={'rgba(255,255,255,0.8)'}
                    color={'black'}
                    label={'Last block time'}
                    aria-label={'Last block time'}
                  >
                    <Box display={'flex'}>
                      <GoHourglass size={25} color={'#888'} />
                    </Box>
                  </Tooltip>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {displayedInfo.map((info, index) => {
                return (
                  <Tr key={`node-${index}`}>
                    <Td>
                      <PiCircleNotchThin size={25} color={'#50fa7b'} />
                    </Td>
                    <Td>
                      <Text fontSize={'sm'}>{info.dynamic_info?.moniker}</Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {info.dynamic_info?.is_validator ? (
                          <ImCheckmark2 size={20} color={'#50fa7b'} />
                        ) : (
                          <ImCross size={20} color={'#888'} />
                        )}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {info.dynamic_info?.net_info?.peers.length}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {info.dynamic_info?.pending_txs.toNumber() as number}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {`#${info.dynamic_info?.block_info?.number.toLocaleString()}`}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'} isTruncated>
                        {`TODO add hash to proto`}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {`TODO add block txs to proto`}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {`${getLastUpdateTime(info.dynamic_info?.block_info?.timestamp as Long)}s ago`}
                      </Text>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Container>
  );
};

export default Home;
