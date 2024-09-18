import { EAction, ESortDirection, ESortOption } from './home.types.ts';
import { DataPoint, PeerInfo } from '../../../proto/stats.ts';

export type DataPointAction = {
  type: EAction.NEW_DATAPOINT;
  payload: {
    id: string;
    data: DataPoint;
  };
};

export type UpdateSortAction = {
  type: EAction.UPDATE_SORT;
  payload: {
    option: ESortOption;
    direction: ESortDirection;
  };
};

export interface IViewState {
  dataMap: Map<string, DataPoint>;
  displayedInfo: DataPoint[];
  sortOption: ESortOption;
  sortDirection: ESortDirection;
}

export type Action = DataPointAction | UpdateSortAction;

export const nodeReducer = (state: IViewState, action: Action): IViewState => {
  switch (action.type) {
    case EAction.NEW_DATAPOINT: {
      const newDataMap = new Map(state.dataMap);
      const dataPoint: DataPoint = action.payload.data;

      newDataMap.set(action.payload.id, dataPoint);

      return {
        ...state,
        dataMap: newDataMap,
        displayedInfo: getSortedAndPinnedArray(
          newDataMap,
          state.sortOption,
          state.sortDirection
        )
      };
    }

    case EAction.UPDATE_SORT: {
      return {
        ...state,
        sortOption: action.payload.option,
        displayedInfo: getSortedAndPinnedArray(
          state.dataMap,
          action.payload.option,
          action.payload.direction
        )
      };
    }
    default:
      return state;
  }
};

export function getSortedAndPinnedArray(
  dataMap: Map<string, DataPoint>,
  sortOption: ESortOption,
  direction: ESortDirection = ESortDirection.DESCENDING
): DataPoint[] {
  return [...dataMap.values()].sort(
    (a: DataPoint, b: DataPoint) =>
      applySortingLogic(a, b, sortOption, direction) // sort by option
  );
}

export function applySortingLogic(
  a: DataPoint,
  b: DataPoint,
  sortOption: ESortOption,
  sortDirection: ESortDirection = ESortDirection.ASCENDING
): number {
  const multiplier = sortDirection === ESortDirection.ASCENDING ? 1 : -1;

  switch (sortOption) {
    case ESortOption.MONIKER:
      return (
        multiplier *
        (a.dynamic_info?.moniker as string).localeCompare(
          b.dynamic_info?.moniker as string
        )
      );

    case ESortOption.VALIDATING:
      return (
        multiplier *
        (a.dynamic_info?.is_validator === b.dynamic_info?.is_validator
          ? 0
          : a.dynamic_info?.is_validator
            ? -1
            : 1)
      ); // (true first)

    case ESortOption.PEERS:
      return (
        multiplier *
        ((a.dynamic_info?.net_info?.peers as PeerInfo[]).length -
          (b.dynamic_info?.net_info?.peers as PeerInfo[]).length)
      );

    case ESortOption.PENDING_TXS:
      return (
        multiplier *
        ((a.dynamic_info?.pending_txs.toNumber() as number) -
          (b.dynamic_info?.pending_txs.toNumber() as number))
      );

    case ESortOption.LAST_BLOCK:
      return (
        multiplier *
        ((a.dynamic_info?.block_info?.number.toNumber() as number) -
          (b.dynamic_info?.block_info?.number.toNumber() as number))
      );

    case ESortOption.BLOCK_HASH:
      // TODO add hash to info
      return multiplier * 'a'.localeCompare('b');

    case ESortOption.BLOCK_TXS:
      // TODO add block txs
      return multiplier * 0;

    case ESortOption.LAST_BLOCK_TIME:
      return (
        multiplier *
        (new Date(
          a.dynamic_info?.block_info?.timestamp.toNumber() as number
        ).getTime() -
          new Date(
            b.dynamic_info?.block_info?.timestamp.toNumber() as number
          ).getTime())
      );

    default:
      return 0;
  }
}
