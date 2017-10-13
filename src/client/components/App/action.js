import Type from 'union-type'

const Action = Type({
  PlaceBid: [],
  UpdateBidAmount: [ Number ],
  NewBidPlaced: [ Object ],
  Error: [ Object ]
})

export default Action
