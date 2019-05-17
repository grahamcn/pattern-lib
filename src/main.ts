import { run } from '@cycle/run'
import { makeDOMDriver } from '@cycle/dom'
import { makeHistoryDriver } from '@cycle/history'

import MenuDriver from './app/drivers/menu'
import App from './app/'

import './scss/styles.scss'

const drivers = {
  DOM: makeDOMDriver('#app'),
  History: makeHistoryDriver(),
  Menu: MenuDriver,
}

run(App, drivers)
