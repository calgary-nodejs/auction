import { html } from 'snabbdom-jsx'
import moment from 'moment'
import numeral from 'numeral'

const view = ({ state, dispatch }) => (
  <table className="table table-striped table-hover ">
    <thead>
      <tr>
        <th>Bidder</th>
        <th>Amount</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{state.bidder}</td>
        <td>{numeral(state.amount).format('$0,0.00')}</td>
        <td>{moment(state.time).format('ddd, MMM D, YYYY hh:mm:ss A')}</td>
      </tr>
    </tbody>
  </table>
)

export default { view }
