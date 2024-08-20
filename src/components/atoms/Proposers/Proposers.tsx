import { IProposersProps } from './proposers.types.ts';
import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Proposers: FC<IProposersProps> = (props) => {
  const { proposers } = props;

  return (
    <Flex
      direction={'column'}
      flexGrow={1}
      style={{
        border: '1px solid rgba(255, 255, 255, .05)'
      }}
      padding={4}
      rowGap={4}
    >
      <Flex alignItems={'center'} columnGap={4}>
        <Text
          fontWeight={700}
          textTransform={'uppercase'}
          color={'#AAA'}
          fontSize={'sm'}
        >
          Last proposers
        </Text>
      </Flex>
      <Flex direction={'column'} rowGap={4}>
        {proposers.map((proposer, index) => {
          return (
            <Text
              key={index}
              fontWeight={700}
              textTransform={'uppercase'}
              color={'#777'}
              fontSize={'xs'}
            >
              {`#${index} ${proposer}`}
            </Text>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default Proposers;
