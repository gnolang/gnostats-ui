export interface IHomeProps {}

export interface ILatestBlock {
  bestBlock: number;
  lastBlockTimestamp: number; // unix timestamp
  gasFee: number;
  gasLimit: number;
}

export interface INodeData {
  address: string;
  moniker: string;
  isValidator: boolean;
  pendingTxs: number;
  numPeers: number;

  latestBlockNumber: number;
  latestBlockHash: string;
  latestBlockTxs: number;
  latestBlockTimestamp: number;
  latestGasUsed: number;
  latestGasWanted: number;
  latestProposer: string;
}

export interface IDisplayedInfo {
  data: INodeData;
  timeSince: string;
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
  UPDATE_SORT = 'UPDATE_SORT',
  UPDATE_TIMESTAMP = 'UPDATE_TIMESTAMP'
}
