import xs, { Stream } from 'xstream'
import { div, VNode, h1, DOMSource } from '@cycle/dom'

import MenuComponent, { Menu } from './components/menu'
import { Location } from 'history'

interface Sinks {
  DOM: Stream<VNode>
  History: Stream<string>
}

interface Sources {
  Menu: Stream<Menu>
  History: Stream<Location>
  DOM: DOMSource
}

function App(sources: Sources): Sinks {
  const menuComponent = MenuComponent(sources)
  const menuDom$ = menuComponent.DOM
  const menuCLick$ = menuComponent.History

  const vdom$ = menuDom$.map(menuDom =>
    div('.app', [h1('Pattern Library'), menuDom]),
  )

  return {
    DOM: vdom$,
    History: menuCLick$,
  }
}

export default App
