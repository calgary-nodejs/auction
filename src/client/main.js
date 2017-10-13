import { init } from 'snabbdom'
import classes from 'snabbdom/modules/class'
import props from 'snabbdom/modules/props'
import style from 'snabbdom/modules/style'
import eventlisteners from 'snabbdom/modules/eventlisteners'

const patch = init([ classes, props, style, eventlisteners ])

const defaultUpdate = state => state

const main = (state, vdom, { view, update = defaultUpdate }) => {
  const dispatch = action => {
    const newState = update(state, action)
    main(newState, newVdom, { view, update })
  }
  const newVdom = view({ state, dispatch })
  patch(vdom, newVdom)
}

export default main
