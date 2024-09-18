import { ICardProps } from './card.types.ts';
import { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Card: FC<ICardProps> = (props) => {
  const { name, color, value, icon } = props;

  return (
    <Flex
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      columnGap={4}
      style={{
        border: '1px solid rgba(255, 255, 255, .05)'
      }}
      padding={4}
      flexGrow={1}
    >
      {icon}
      <Flex direction={'column'}>
        <Text
          fontWeight={700}
          textTransform={'uppercase'}
          color={'#AAA'}
          fontSize={'sm'}
        >
          {name}
        </Text>
        <Text fontWeight={200} fontSize={'4xl'} color={color}>
          {value}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Card;
