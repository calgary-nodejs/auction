import { html } from 'snabbdom-jsx'
import numeral from 'numeral'
import Action from './action'
import Bid from '../Bid'

const onSubmit = (dispatch) => event => {
  event.preventDefault()
  dispatch(Action.PlaceBidOf())
}

const onInput = (dispatch, action) => event => dispatch(action(parseFloat(event.target.value || 0)))

const view = ({ state, dispatch }) => (
  <div classNames="panel panel-default">
    <div classNames="panel-heading">
      <strong>Bidding for:</strong> {state.name}
    </div>
    <div classNames="panel-body">
      <div classNames="row">
        <div classNames="col-xs-9">
          <div classNames="row">
            <label classNames="col-xs-3">Starting Price:</label>
            <div classNames="col-xs-9">{numeral(state.startPrice).format('$0,0.00')}</div>
          </div>
          <div classNames="row">
            <label classNames="col-xs-3">Current Price:</label>
            <div classNames="col-xs-9">{numeral(state.currentPrice).format('$0,0.00')}</div>
          </div>
          <div classNames="row">
            <label classNames="col-xs-3">Enter Your Bid:</label>
            <div classNames="col-xs-9">
              <form classNames="form-inline" on-submit={onSubmit(dispatch)}>
                <div classNames={'form-group' + (state.error && state.error.type==='BID_VALIDATION' ? ' has-error' : '')}>
                  <input type="text" classNames="form-control input-sm"
                    on-input={onInput(dispatch, Action.UpdateBidAmount)} value={state.bid && state.bid.amount} />&nbsp;
                </div>
                <button type="submit" classNames="btn btn-default btn-sm">Place Bid</button>
              </form>
            </div>
          </div>
          <div classNames="row">
            <label classNames="col-xs-12">Bidding History:</label>
          </div>
          <div classNames="row">
            <div classNames="col-xs-12">
              {state.bidHistory.map(bid => <Bid state={bid} dispatch={dispatch} />)}
            </div>
          </div>
        </div>
        <div classNames="col-xs-3">
          <img src={state.picture} height="128" width="128" />
        </div>
      </div>
    </div>

    {state.watchCount > 0 ?
      <div className="watchCount">
        Others watching: {state.watchCount}
      </div>
      : '' }

    {state.error ?
      <div classNames="alert alert-dismissible alert-danger toast">
        {state.error.message}
      </div>
    : '' }

  </div>
)

export default view
