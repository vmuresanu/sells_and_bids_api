export enum AuctionTypeEnum {
  /**
   * Regular sale - no auction
   */
  SALE  = 'sale',

  /**
   * Highest bidder gets the product
   */
  ABSOLUTE  = 'absolute',

  /**
   * Minimum bid below which product cannot be sold
   */
  MIN_BID  = 'minBid',

  /**
   * Seller has right to not accept the highest bid
   */
  RESERVE  = 'reserve',
}
