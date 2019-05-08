import xs, { Stream } from 'xstream'
import { div, VNode, h1 } from '@cycle/dom'

interface Sinks {
  DOM: Stream<VNode>
}

interface Sources {}

function App(sources: Sources): Sinks {
  const vdom$ = xs.of(div('.app', [h1('Pattern Library')]))

  return {
    DOM: vdom$,
  }
}

export default App
