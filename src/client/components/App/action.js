import Type from 'union-type'

const Action = Type({
  PlaceBid: [],
  UpdateBidAmount: [ Number ],
  NewBidPlaced: [ Object ],
  WatchCountChanged: [ Number ],
  Error: [ Object ]
})

export default Action
