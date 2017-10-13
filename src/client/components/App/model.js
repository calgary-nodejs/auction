import Action from './action'

export const update = socket => (state, action) => Action.case({
  UpdateBidAmount: amount => ({ ...state, bid: { amount } }),
  NewBidPlaced: bid => ({
    ...state,
    currentPrice: state.startPrice + bid.amount,
    bidHistory: [ bid, ...state.bidHistory ]
  }),
  PlaceBid: () => {
    if (!state.bid) {
      return state
    }
    socket.emit('new_bid', {
      lotId: state.id,
      amount: state.bid.amount
    })
    return {...state, error: null }
  },
  Error: error => ({
    ...state, error
  })
}, action)
