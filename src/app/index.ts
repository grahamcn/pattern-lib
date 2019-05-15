import { Stream } from 'xstream'
import { div, VNode, h1, p } from '@cycle/dom'

import {Menu} from '../main'

interface Sinks {
  DOM: Stream<VNode>
}

interface Sources {
  Menu: Stream<Menu>
}


function App(sources: Sources): Sinks {
  const vdom$ = sources.Menu.map(menuData => 
    div('.app', [h1('Pattern Library'), p(JSON.stringify(menuData))])
  )

  return {
    DOM: vdom$,
  }
}

export default App
