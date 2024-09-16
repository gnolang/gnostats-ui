// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.1
// source: stats.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import Long from "long";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "";

/** StaticInfo is the single node register request with the hub */
export interface StaticInfo {
  /** the ID of the node */
  address: string;
  /** the gno version of the node */
  gno_version: string;
  /** the OS info of the node */
  os_version: string;
}

/** DynamicInfo is the single node data push */
export interface DynamicInfo {
  /** the ID of the node */
  address: string;
  /** the moniker of the node */
  moniker: string;
  /** flag indicating valset inclusion */
  is_validator: boolean;
  /** the active p2p information */
  net_info?:
    | NetInfo
    | undefined;
  /** the number of currently pending txs */
  pending_txs: Long;
  /** the latest block information */
  block_info?: BlockInfo | undefined;
}

/** BlockInfo is the latest node block information */
export interface BlockInfo {
  /** the latest block height */
  number: Long;
  /** the latest block timestamp (unix) */
  timestamp: Long;
  /** the gas used in the block */
  gas_used: Long;
  /** the gas wanted in the block (limit) */
  gas_wanted: Long;
  /** the proposer of the block */
  proposer: string;
}

/** NetInfo is the latest node p2p information */
export interface NetInfo {
  /** the network p2p address of the node */
  p2p_address: string;
  /** the peer information */
  peers: PeerInfo[];
}

/** PeerInfo is information relating to a single peer */
export interface PeerInfo {
  /** the p2p address of the peer */
  p2p_address: string;
  /** the moniker of the peer */
  moniker: string;
}

/**
 * DataPoint is the newest data point for a specific node,
 * that wraps the dynamic and static node info
 */
export interface DataPoint {
  /** the node's dynamic info */
  dynamic_info?:
    | DynamicInfo
    | undefined;
  /** the node's static info */
  static_info?: StaticInfo | undefined;
}

function createBaseStaticInfo(): StaticInfo {
  return { address: "", gno_version: "", os_version: "" };
}

export const StaticInfo: MessageFns<StaticInfo> = {
  encode(message: StaticInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.gno_version !== "") {
      writer.uint32(18).string(message.gno_version);
    }
    if (message.os_version !== "") {
      writer.uint32(26).string(message.os_version);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StaticInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStaticInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.gno_version = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.os_version = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StaticInfo {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      gno_version: isSet(object.gno_version) ? globalThis.String(object.gno_version) : "",
      os_version: isSet(object.os_version) ? globalThis.String(object.os_version) : "",
    };
  },

  toJSON(message: StaticInfo): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.gno_version !== undefined) {
      obj.gno_version = message.gno_version;
    }
    if (message.os_version !== undefined) {
      obj.os_version = message.os_version;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StaticInfo>, I>>(base?: I): StaticInfo {
    return StaticInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StaticInfo>, I>>(object: I): StaticInfo {
    const message = createBaseStaticInfo();
    message.address = object.address ?? "";
    message.gno_version = object.gno_version ?? "";
    message.os_version = object.os_version ?? "";
    return message;
  },
};

function createBaseDynamicInfo(): DynamicInfo {
  return {
    address: "",
    moniker: "",
    is_validator: false,
    net_info: undefined,
    pending_txs: Long.UZERO,
    block_info: undefined,
  };
}

export const DynamicInfo: MessageFns<DynamicInfo> = {
  encode(message: DynamicInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.moniker !== "") {
      writer.uint32(18).string(message.moniker);
    }
    if (message.is_validator !== false) {
      writer.uint32(24).bool(message.is_validator);
    }
    if (message.net_info !== undefined) {
      NetInfo.encode(message.net_info, writer.uint32(34).fork()).join();
    }
    if (!message.pending_txs.equals(Long.UZERO)) {
      writer.uint32(40).uint64(message.pending_txs.toString());
    }
    if (message.block_info !== undefined) {
      BlockInfo.encode(message.block_info, writer.uint32(50).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DynamicInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDynamicInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.moniker = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.is_validator = reader.bool();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.net_info = NetInfo.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.pending_txs = Long.fromString(reader.uint64().toString(), true);
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.block_info = BlockInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DynamicInfo {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      moniker: isSet(object.moniker) ? globalThis.String(object.moniker) : "",
      is_validator: isSet(object.is_validator) ? globalThis.Boolean(object.is_validator) : false,
      net_info: isSet(object.net_info) ? NetInfo.fromJSON(object.net_info) : undefined,
      pending_txs: isSet(object.pending_txs) ? Long.fromValue(object.pending_txs) : Long.UZERO,
      block_info: isSet(object.block_info) ? BlockInfo.fromJSON(object.block_info) : undefined,
    };
  },

  toJSON(message: DynamicInfo): unknown {
    const obj: any = {};
    if (message.address !== undefined) {
      obj.address = message.address;
    }
    if (message.moniker !== undefined) {
      obj.moniker = message.moniker;
    }
    if (message.is_validator !== undefined) {
      obj.is_validator = message.is_validator;
    }
    if (message.net_info !== undefined) {
      obj.net_info = NetInfo.toJSON(message.net_info);
    }
    if (message.pending_txs !== undefined) {
      obj.pending_txs = (message.pending_txs || Long.UZERO).toString();
    }
    if (message.block_info !== undefined) {
      obj.block_info = BlockInfo.toJSON(message.block_info);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DynamicInfo>, I>>(base?: I): DynamicInfo {
    return DynamicInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DynamicInfo>, I>>(object: I): DynamicInfo {
    const message = createBaseDynamicInfo();
    message.address = object.address ?? "";
    message.moniker = object.moniker ?? "";
    message.is_validator = object.is_validator ?? false;
    message.net_info = (object.net_info !== undefined && object.net_info !== null)
      ? NetInfo.fromPartial(object.net_info)
      : undefined;
    message.pending_txs = (object.pending_txs !== undefined && object.pending_txs !== null)
      ? Long.fromValue(object.pending_txs)
      : Long.UZERO;
    message.block_info = (object.block_info !== undefined && object.block_info !== null)
      ? BlockInfo.fromPartial(object.block_info)
      : undefined;
    return message;
  },
};

function createBaseBlockInfo(): BlockInfo {
  return { number: Long.UZERO, timestamp: Long.UZERO, gas_used: Long.UZERO, gas_wanted: Long.UZERO, proposer: "" };
}

export const BlockInfo: MessageFns<BlockInfo> = {
  encode(message: BlockInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (!message.number.equals(Long.UZERO)) {
      writer.uint32(8).uint64(message.number.toString());
    }
    if (!message.timestamp.equals(Long.UZERO)) {
      writer.uint32(16).uint64(message.timestamp.toString());
    }
    if (!message.gas_used.equals(Long.UZERO)) {
      writer.uint32(24).uint64(message.gas_used.toString());
    }
    if (!message.gas_wanted.equals(Long.UZERO)) {
      writer.uint32(32).uint64(message.gas_wanted.toString());
    }
    if (message.proposer !== "") {
      writer.uint32(42).string(message.proposer);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): BlockInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.number = Long.fromString(reader.uint64().toString(), true);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.timestamp = Long.fromString(reader.uint64().toString(), true);
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.gas_used = Long.fromString(reader.uint64().toString(), true);
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.gas_wanted = Long.fromString(reader.uint64().toString(), true);
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.proposer = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockInfo {
    return {
      number: isSet(object.number) ? Long.fromValue(object.number) : Long.UZERO,
      timestamp: isSet(object.timestamp) ? Long.fromValue(object.timestamp) : Long.UZERO,
      gas_used: isSet(object.gas_used) ? Long.fromValue(object.gas_used) : Long.UZERO,
      gas_wanted: isSet(object.gas_wanted) ? Long.fromValue(object.gas_wanted) : Long.UZERO,
      proposer: isSet(object.proposer) ? globalThis.String(object.proposer) : "",
    };
  },

  toJSON(message: BlockInfo): unknown {
    const obj: any = {};
    if (message.number !== undefined) {
      obj.number = (message.number || Long.UZERO).toString();
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = (message.timestamp || Long.UZERO).toString();
    }
    if (message.gas_used !== undefined) {
      obj.gas_used = (message.gas_used || Long.UZERO).toString();
    }
    if (message.gas_wanted !== undefined) {
      obj.gas_wanted = (message.gas_wanted || Long.UZERO).toString();
    }
    if (message.proposer !== undefined) {
      obj.proposer = message.proposer;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockInfo>, I>>(base?: I): BlockInfo {
    return BlockInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BlockInfo>, I>>(object: I): BlockInfo {
    const message = createBaseBlockInfo();
    message.number = (object.number !== undefined && object.number !== null)
      ? Long.fromValue(object.number)
      : Long.UZERO;
    message.timestamp = (object.timestamp !== undefined && object.timestamp !== null)
      ? Long.fromValue(object.timestamp)
      : Long.UZERO;
    message.gas_used = (object.gas_used !== undefined && object.gas_used !== null)
      ? Long.fromValue(object.gas_used)
      : Long.UZERO;
    message.gas_wanted = (object.gas_wanted !== undefined && object.gas_wanted !== null)
      ? Long.fromValue(object.gas_wanted)
      : Long.UZERO;
    message.proposer = object.proposer ?? "";
    return message;
  },
};

function createBaseNetInfo(): NetInfo {
  return { p2p_address: "", peers: [] };
}

export const NetInfo: MessageFns<NetInfo> = {
  encode(message: NetInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.p2p_address !== "") {
      writer.uint32(10).string(message.p2p_address);
    }
    for (const v of message.peers) {
      PeerInfo.encode(v!, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): NetInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNetInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.p2p_address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.peers.push(PeerInfo.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NetInfo {
    return {
      p2p_address: isSet(object.p2p_address) ? globalThis.String(object.p2p_address) : "",
      peers: globalThis.Array.isArray(object?.peers) ? object.peers.map((e: any) => PeerInfo.fromJSON(e)) : [],
    };
  },

  toJSON(message: NetInfo): unknown {
    const obj: any = {};
    if (message.p2p_address !== undefined) {
      obj.p2p_address = message.p2p_address;
    }
    if (message.peers?.length) {
      obj.peers = message.peers.map((e) => PeerInfo.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NetInfo>, I>>(base?: I): NetInfo {
    return NetInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NetInfo>, I>>(object: I): NetInfo {
    const message = createBaseNetInfo();
    message.p2p_address = object.p2p_address ?? "";
    message.peers = object.peers?.map((e) => PeerInfo.fromPartial(e)) || [];
    return message;
  },
};

function createBasePeerInfo(): PeerInfo {
  return { p2p_address: "", moniker: "" };
}

export const PeerInfo: MessageFns<PeerInfo> = {
  encode(message: PeerInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.p2p_address !== "") {
      writer.uint32(10).string(message.p2p_address);
    }
    if (message.moniker !== "") {
      writer.uint32(18).string(message.moniker);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): PeerInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePeerInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.p2p_address = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.moniker = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PeerInfo {
    return {
      p2p_address: isSet(object.p2p_address) ? globalThis.String(object.p2p_address) : "",
      moniker: isSet(object.moniker) ? globalThis.String(object.moniker) : "",
    };
  },

  toJSON(message: PeerInfo): unknown {
    const obj: any = {};
    if (message.p2p_address !== undefined) {
      obj.p2p_address = message.p2p_address;
    }
    if (message.moniker !== undefined) {
      obj.moniker = message.moniker;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PeerInfo>, I>>(base?: I): PeerInfo {
    return PeerInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PeerInfo>, I>>(object: I): PeerInfo {
    const message = createBasePeerInfo();
    message.p2p_address = object.p2p_address ?? "";
    message.moniker = object.moniker ?? "";
    return message;
  },
};

function createBaseDataPoint(): DataPoint {
  return { dynamic_info: undefined, static_info: undefined };
}

export const DataPoint: MessageFns<DataPoint> = {
  encode(message: DataPoint, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.dynamic_info !== undefined) {
      DynamicInfo.encode(message.dynamic_info, writer.uint32(10).fork()).join();
    }
    if (message.static_info !== undefined) {
      StaticInfo.encode(message.static_info, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DataPoint {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataPoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.dynamic_info = DynamicInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.static_info = StaticInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DataPoint {
    return {
      dynamic_info: isSet(object.dynamic_info) ? DynamicInfo.fromJSON(object.dynamic_info) : undefined,
      static_info: isSet(object.static_info) ? StaticInfo.fromJSON(object.static_info) : undefined,
    };
  },

  toJSON(message: DataPoint): unknown {
    const obj: any = {};
    if (message.dynamic_info !== undefined) {
      obj.dynamic_info = DynamicInfo.toJSON(message.dynamic_info);
    }
    if (message.static_info !== undefined) {
      obj.static_info = StaticInfo.toJSON(message.static_info);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DataPoint>, I>>(base?: I): DataPoint {
    return DataPoint.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DataPoint>, I>>(object: I): DataPoint {
    const message = createBaseDataPoint();
    message.dynamic_info = (object.dynamic_info !== undefined && object.dynamic_info !== null)
      ? DynamicInfo.fromPartial(object.dynamic_info)
      : undefined;
    message.static_info = (object.static_info !== undefined && object.static_info !== null)
      ? StaticInfo.fromPartial(object.static_info)
      : undefined;
    return message;
  },
};

/** Hub is the stats gathering service (hub) */
export interface Hub {
  /** GetDataStream returns a stream of fresh data from the stats hub */
  GetDataStream(request: Empty): Observable<DataPoint>;
  /** Register registers the node instance with the stats hub */
  Register(request: StaticInfo): Promise<Empty>;
  /** PushData continuously pushes the node data to the stats hub */
  PushData(request: Observable<DynamicInfo>): Promise<Empty>;
}

export const HubServiceName = "Hub";
export class HubClientImpl implements Hub {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || HubServiceName;
    this.rpc = rpc;
    this.GetDataStream = this.GetDataStream.bind(this);
    this.Register = this.Register.bind(this);
    this.PushData = this.PushData.bind(this);
  }
  GetDataStream(request: Empty): Observable<DataPoint> {
    const data = Empty.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "GetDataStream", data);
    return result.pipe(map((data) => DataPoint.decode(new BinaryReader(data))));
  }

  Register(request: StaticInfo): Promise<Empty> {
    const data = StaticInfo.encode(request).finish();
    const promise = this.rpc.request(this.service, "Register", data);
    return promise.then((data) => Empty.decode(new BinaryReader(data)));
  }

  PushData(request: Observable<DynamicInfo>): Promise<Empty> {
    const data = request.pipe(map((request) => DynamicInfo.encode(request).finish()));
    const promise = this.rpc.clientStreamingRequest(this.service, "PushData", data);
    return promise.then((data) => Empty.decode(new BinaryReader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
