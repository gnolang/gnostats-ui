export interface IHomeProps {}

export interface ILatestBlock {
  bestBlock: number;
  lastBlock: number; // unix timestamp
  gasFee: number;
  gasLimit: number;
}
