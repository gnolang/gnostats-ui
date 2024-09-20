import {
  EAction,
  ESortDirection,
  ESortOption,
  IDisplayedInfo,
  INodeData
} from './home.types.ts';

export type DataPointAction = {
  type: EAction.NEW_DATAPOINT;
  payload: {
    id: string;
    data: INodeData;
  };
};

export type UpdateSortAction = {
  type: EAction.UPDATE_SORT;
  payload: {
    option: ESortOption;
    direction: ESortDirection;
  };
};

export type PinDataPointAction = {
  type: EAction.PIN_ITEM;
  payload: {
    id: string;
  };
};

export type UpdateTimestampAction = {
  type: EAction.UPDATE_TIMESTAMP;
};

export interface IViewState {
  dataMap: Map<string, INodeData>;
  pinnedMap: Map<string, boolean>;
  displayedInfo: IDisplayedInfo[];
  sortOption: ESortOption;
  sortDirection: ESortDirection;
}

export type Action =
  | DataPointAction
  | UpdateSortAction
  | PinDataPointAction
  | UpdateTimestampAction;

export const nodeReducer = (state: IViewState, action: Action): IViewState => {
  switch (action.type) {
    case EAction.NEW_DATAPOINT: {
      const newDataMap = new Map(state.dataMap);
      const dataPoint: INodeData = action.payload.data;

      newDataMap.set(action.payload.id, dataPoint);

      return {
        ...state,
        dataMap: newDataMap,
        displayedInfo: getSortedAndPinnedArray(
          newDataMap,
          state.pinnedMap,
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
          state.pinnedMap,
          action.payload.option,
          action.payload.direction
        )
      };
    }

    case EAction.PIN_ITEM: {
      const newPinnedMap = new Map(state.pinnedMap);
      const isPinned: boolean | undefined = newPinnedMap.get(action.payload.id);

      newPinnedMap.set(action.payload.id, !isPinned);

      return {
        ...state,
        pinnedMap: newPinnedMap,
        displayedInfo: getSortedAndPinnedArray(
          state.dataMap,
          newPinnedMap,
          state.sortOption,
          state.sortDirection
        )
      };
    }
    case EAction.UPDATE_TIMESTAMP: {
      return {
        ...state,
        displayedInfo: getSortedAndPinnedArray(
          state.dataMap,
          state.pinnedMap,
          state.sortOption,
          state.sortDirection
        )
      };
    }

    default:
      return state;
  }
};

export function getSortedAndPinnedArray(
  dataMap: Map<string, INodeData>,
  pinnedMap: Map<string, boolean>,
  sortOption: ESortOption,
  direction: ESortDirection = ESortDirection.DESCENDING
): IDisplayedInfo[] {
  return [...dataMap.values()]
    .sort((a: INodeData, b: INodeData) =>
      applySortingLogic(a, b, sortOption, direction)
    )
    .sort((a: INodeData, b: INodeData) => {
      const aPinned = !!pinnedMap.get(a.address);
      const bPinned = !!pinnedMap.get(b.address);

      return aPinned === bPinned ? 0 : aPinned ? -1 : 1;
    })
    .map((data: INodeData) => {
      return {
        data: data,
        timeSince: calculateTimeSince(data.latestBlockTimestamp)
      };
    });
}

export function applySortingLogic(
  a: INodeData,
  b: INodeData,
  sortOption: ESortOption,
  sortDirection: ESortDirection = ESortDirection.ASCENDING
): number {
  const multiplier = sortDirection === ESortDirection.ASCENDING ? 1 : -1;

  switch (sortOption) {
    case ESortOption.MONIKER:
      return multiplier * a.moniker.localeCompare(b.moniker);

    case ESortOption.VALIDATING:
      return (
        multiplier *
        (a.isValidator === b.isValidator ? 0 : a.isValidator ? -1 : 1)
      ); // (true first)

    case ESortOption.PEERS:
      return multiplier * (a.numPeers - b.numPeers);

    case ESortOption.PENDING_TXS:
      return multiplier * (a.pendingTxs - b.pendingTxs);

    case ESortOption.LAST_BLOCK:
      return multiplier * (a.latestBlockNumber - b.latestBlockNumber);

    case ESortOption.BLOCK_HASH:
      // TODO add hash to info
      return multiplier * 'a'.localeCompare('b');

    case ESortOption.BLOCK_TXS:
      // TODO add block txs
      return multiplier * 0;

    case ESortOption.LAST_BLOCK_TIME:
      return (
        multiplier *
        (new Date(a.latestBlockTimestamp).getTime() -
          new Date(b.latestBlockTimestamp).getTime())
      );

    default:
      return 0;
  }
}

export const calculateTimeSince = (timestamp: number) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const seconds = currentTime - timestamp;

  if (seconds < 120) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;

  return `${Math.floor(seconds / 3600)}h ago`;
};
