import { Observable } from 'rxjs'
import socket from '../../socket'
import view from './view'
import { createObservableFrom } from '../../util'
import Action from './action'
import { update } from './model'

/**
 * This view stream$ will emit objects containing { state, dispatch }
 * whenever a view() function is being called by an action dispatch
 */
const observableView = createObservableFrom(view)

Observable
  .fromEvent(socket, 'new_bid_placed')
  .withLatestFrom(observableView.stream$, (bid, { state, dispatch }) => {
    dispatch(Action.NewBidPlaced(bid))
  })
  .subscribe()

Observable
  .fromEvent(socket, 'new_bid_error')
  .withLatestFrom(observableView.stream$, (error, { state, dispatch }) => {
    dispatch(Action.Error(error))
  })
  .subscribe()

Observable
  .fromEvent(socket, 'watch_count')
  .withLatestFrom(observableView.stream$, (watchCount, { state, dispatch }) => {
    dispatch(Action.WatchCountChanged(watchCount))
  })
  .subscribe()

export default {
  update: update(socket),
  view: observableView,
  Action
}
