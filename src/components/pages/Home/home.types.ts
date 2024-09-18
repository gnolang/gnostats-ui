export interface IHomeProps {}

export interface ILatestBlock {
  bestBlock: number;
  lastBlock: number; // unix timestamp
  gasFee: number;
  gasLimit: number;
}

export enum ESortOption {
  MONIKER = 'MONIKER',
  VALIDATING = 'VALIDATING',
  PEERS = 'PEERS',
  PENDING_TXS = 'PENDING_TXS',
  LAST_BLOCK = 'LAST_BLOCK',
  BLOCK_HASH = 'BLOCK_HASH',
  BLOCK_TXS = 'BLOCK_TXS',
  LAST_BLOCK_TIME = 'LAST_BLOCK_TIME'
}

export enum ESortDirection {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING'
}

export enum EAction {
  NEW_DATAPOINT = 'NEW_DATAPOINT',
  PIN_ITEM = 'PIN_ITEM',
  UPDATE_SORT = 'UPDATE_SORT'
}
