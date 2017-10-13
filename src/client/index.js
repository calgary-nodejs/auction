import { getLotById } from './facades/lot'
import main from './main'
import App from './components/App'

const appNode = document.getElementById('app')

/**
 * Load main App state (i.e. lot)
 */
getLotById('62aee188-d0de-471a-8e2e-2918b0bfdd62')
  .then(state => main(state, appNode, App))
