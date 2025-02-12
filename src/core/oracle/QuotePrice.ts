import { JSONSerializable } from '../../util/json'
import { QuotePrice as QuotePrice_pb } from '@initia/initia.proto/connect/oracle/v2/genesis'

/**
 * QuotePrice is the representation of the aggregated prices for a CurrencyPair,
 * where price represents the price of Base in terms of Quote.
 */
export class QuotePrice extends JSONSerializable<
  QuotePrice.Amino,
  QuotePrice.Data,
  QuotePrice.Proto
> {
  /**
   * @param price
   * @param block_timestamp tracks the block height associated with this price update
   * @param block_height block height of provider chain
   */
  constructor(
    public price: string,
    public block_timestamp: Date,
    public block_height: number
  ) {
    super()
  }

  public static fromAmino(data: QuotePrice.Amino): QuotePrice {
    const { price, block_timestamp, block_height } = data
    return new QuotePrice(
      price,
      new Date(block_timestamp),
      parseInt(block_height)
    )
  }

  public toAmino(): QuotePrice.Amino {
    const { price, block_timestamp, block_height } = this
    return {
      price,
      block_timestamp: block_timestamp.toISOString(),
      block_height: block_height.toFixed(),
    }
  }

  public static fromData(data: QuotePrice.Data): QuotePrice {
    const { price, block_timestamp, block_height } = data
    return new QuotePrice(
      price,
      new Date(block_timestamp),
      parseInt(block_height)
    )
  }

  public toData(): QuotePrice.Data {
    const { price, block_timestamp, block_height } = this
    return {
      price,
      block_timestamp: block_timestamp.toISOString(),
      block_height: block_height.toFixed(),
    }
  }

  public static fromProto(proto: QuotePrice.Proto): QuotePrice {
    return new QuotePrice(
      proto.price,
      proto.blockTimestamp as Date,
      Number(proto.blockHeight)
    )
  }

  public toProto(): QuotePrice.Proto {
    const { price, block_timestamp, block_height } = this
    return QuotePrice_pb.fromPartial({
      price,
      blockTimestamp: block_timestamp,
      blockHeight: BigInt(block_height),
    })
  }
}

export namespace QuotePrice {
  export interface Amino {
    price: string
    block_timestamp: string
    block_height: string
  }

  export interface Data {
    price: string
    block_timestamp: string
    block_height: string
  }

  export type Proto = QuotePrice_pb
}
