import {
  EAction,
  ESortDirection,
  ESortOption,
  IHomeProps,
  ILatestBlock,
  INodeData
} from './home.types.ts';
import { FC, useEffect, useReducer, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr
} from '@chakra-ui/react';
import Card from '../../atoms/Card/Card.tsx';
import { BiCube } from 'react-icons/bi';
import { GoArrowSwitch, GoHourglass } from 'react-icons/go';
import {
  PiCircleNotchThin,
  PiGraphLight,
  PiNetworkLight,
  PiSpeedometer
} from 'react-icons/pi';
import { IoPricetagsOutline } from 'react-icons/io5';
import { SlPuzzle } from 'react-icons/sl';
import Graph from '../../atoms/Graph/Graph.tsx';
import Proposers from '../../atoms/Proposers/Proposers.tsx';
import { CiCircleCheck, CiHashtag } from 'react-icons/ci';
import { FaPeopleGroup } from 'react-icons/fa6';
import { FaVoteYea } from 'react-icons/fa';
import { ImCheckmark2, ImCross } from 'react-icons/im';
import { DataPoint, PeerInfo } from '../../../proto/stats.ts';
import Long from 'long';
import { nodeReducer } from './reducer.ts';

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
        pending_txs: new Long(10),
        block_info: {
          number: new Long(20657283),
          timestamp: new Long(1726849171),
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
          timestamp: new Long(1726849171),
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
        pending_txs: new Long(30),
        block_info: {
          number: new Long(20657283),
          timestamp: new Long(1726849171),
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

  const [nodes, dispatch] = useReducer(nodeReducer, {
    dataMap: new Map<string, INodeData>(),
    pinnedMap: new Map<string, boolean>(),
    displayedInfo: [],
    sortOption: ESortOption.MONIKER,
    sortDirection: ESortDirection.DESCENDING
  });

  useEffect(() => {
    // TODO fetch from stream
    for (const info of infos) {
      const data: INodeData = {
        address: info.static_info?.address as string,
        moniker: info.dynamic_info?.moniker as string,
        isValidator: info.dynamic_info?.is_validator as boolean,
        pendingTxs: info.dynamic_info?.pending_txs.toNumber() as number,
        numPeers: (info.dynamic_info?.net_info?.peers as PeerInfo[]).length,
        latestBlockNumber:
          info.dynamic_info?.block_info?.number.toNumber() as number,
        latestBlockTxs: 0, // TODO add to proto
        latestBlockHash: 'cS17PEb5SApEdkyb0a2V65qc/tWYCTYejNx7jhb+8ps=', // TODO add to proto
        latestBlockTimestamp:
          info.dynamic_info?.block_info?.timestamp.toNumber() as number,
        latestGasUsed:
          info.dynamic_info?.block_info?.gas_used.toNumber() as number,
        latestGasWanted:
          info.dynamic_info?.block_info?.gas_wanted.toNumber() as number,
        latestProposer: info.dynamic_info?.block_info?.proposer as string
      };

      if (data.latestBlockNumber > latestBlock.bestBlock) {
        setLatestBlock({
          bestBlock: data.latestBlockNumber,
          lastBlockTimestamp: data.latestBlockTimestamp,
          gasFee: 0, // TODO add to proto
          gasLimit: data.latestGasWanted
        });
      }

      dispatch({
        type: EAction.NEW_DATAPOINT,
        payload: {
          id: info.static_info?.address as string,
          data: data
        }
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: EAction.UPDATE_TIMESTAMP
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [latestBlock, setLatestBlock] = useState<ILatestBlock>({
    bestBlock: 0,
    lastBlockTimestamp: 0,
    gasFee: 0,
    gasLimit: 0
  });

  const [activeSort, setActiveSort] = useState<ESortOption>(
    ESortOption.MONIKER
  );
  const [activeDirection, setActiveDirection] = useState<ESortDirection>(
    ESortDirection.DESCENDING
  );

  const updateSort = (option: ESortOption) => {
    let direction: ESortDirection = ESortDirection.DESCENDING;

    if (option === activeSort) {
      if (activeDirection === ESortDirection.DESCENDING) {
        direction = ESortDirection.ASCENDING;
      } else {
        direction = ESortDirection.DESCENDING;
      }
    }

    setActiveSort(option);
    setActiveDirection(direction);

    dispatch({
      type: EAction.UPDATE_SORT,
      payload: {
        option,
        direction
      }
    });
  };

  const pinItem = (id: string) => {
    dispatch({
      type: EAction.PIN_ITEM,
      payload: {
        id
      }
    });
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

        <Proposers
          proposers={[
            'g1t9ctfa468hn6czff8kazw08crazehcxaqa2uaa',
            'g1t9ctfa468hn6czff8kazw08crazehcxaqa2uaa',
            'g1t9ctfa468hn6czff8kazw08crazehcxaqa2uaa'
          ]}
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
                    <Box
                      display={'flex'}
                      onClick={() => updateSort(ESortOption.MONIKER)}
                    >
                      <PiNetworkLight
                        size={25}
                        color={'#888'}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
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
                    <Box
                      display={'flex'}
                      onClick={() => updateSort(ESortOption.VALIDATING)}
                    >
                      <FaVoteYea
                        size={25}
                        color={'#888'}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
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
                    <Box
                      display={'flex'}
                      onClick={() => updateSort(ESortOption.PEERS)}
                    >
                      <FaPeopleGroup
                        size={25}
                        color={'#888'}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
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
                    <Box
                      display={'flex'}
                      onClick={() => updateSort(ESortOption.PENDING_TXS)}
                    >
                      <PiGraphLight
                        size={25}
                        color={'#888'}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
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
                    <Box
                      display={'flex'}
                      onClick={() => updateSort(ESortOption.LAST_BLOCK)}
                    >
                      <BiCube
                        size={25}
                        color={'#888'}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
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
                    <Box
                      display={'flex'}
                      onClick={() => updateSort(ESortOption.BLOCK_HASH)}
                    >
                      <CiHashtag
                        size={25}
                        color={'#888'}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
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
                    <Box
                      display={'flex'}
                      onClick={() => updateSort(ESortOption.BLOCK_TXS)}
                    >
                      <GoArrowSwitch
                        size={25}
                        color={'#888'}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
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
                    <Box
                      display={'flex'}
                      onClick={() => updateSort(ESortOption.LAST_BLOCK_TIME)}
                    >
                      <GoHourglass
                        size={25}
                        color={'#888'}
                        style={{
                          cursor: 'pointer'
                        }}
                      />
                    </Box>
                  </Tooltip>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {nodes.displayedInfo.map((info, index) => {
                return (
                  <Tr key={`node-${index}`}>
                    <Td>
                      <Tooltip
                        placement={'bottom-start'}
                        bg={'rgba(255,255,255,0.8)'}
                        color={'black'}
                        label={'Click to pin'}
                        aria-label={'Click to pin'}
                      >
                        <Box display={'flex'}>
                          {nodes.pinnedMap.get(info.data.address) ? (
                            <CiCircleCheck
                              size={25}
                              color={'#50fa7b'}
                              onClick={() => pinItem(info.data.address)}
                            />
                          ) : (
                            <PiCircleNotchThin
                              size={25}
                              color={'#50fa7b'}
                              onClick={() => pinItem(info.data.address)}
                            />
                          )}
                        </Box>
                      </Tooltip>
                    </Td>
                    <Td>
                      <Text fontSize={'sm'}>{info.data.moniker}</Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {info.data.isValidator ? (
                          <ImCheckmark2 size={20} color={'#50fa7b'} />
                        ) : (
                          <ImCross size={20} color={'#888'} />
                        )}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {info.data.numPeers}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {info.data.pendingTxs}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {`#${info.data.latestBlockNumber.toLocaleString()}`}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'} isTruncated>
                        {info.data.latestBlockHash}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {`${info.data.latestBlockTxs} txs`}
                      </Text>
                    </Td>
                    <Td>
                      <Text color={'#50fa7b'} fontSize={'sm'}>
                        {
                          // TODO add color coding
                        }
                        {info.timeSince}
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
