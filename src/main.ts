import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHistoryDriver } from '@cycle/history'

import App from './app/'
import './scss/styles.scss'

const drivers = {

  DOM: makeDOMDriver('#app'),
  History: makeHistoryDriver(),
}

run(App, drivers)

