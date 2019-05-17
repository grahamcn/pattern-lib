import xs, { Stream } from 'xstream'
import { VNode, nav, a, DOMSource, ul, li } from '@cycle/dom'
import { Location } from 'history'

export interface Menu {
  htmlElements: string[]
}

interface Sinks {
  DOM: Stream<VNode>
  History: Stream<string>
}

interface Sources {
  Menu: Stream<Menu>
  History: Stream<Location>
  DOM: DOMSource
}

function Menu(sources: Sources): Sinks {
  const menuItemClick$ = sources.DOM.select('.link')
    .events('click', {
      preventDefault: true,
    })
    .map((event: UIEvent) => event.target)
    .map((element: HTMLAnchorElement) => element.pathname)

  const vdom$: Stream<VNode> = sources.Menu.map(menu =>
    nav(
      '.nav .menu',
      ul(
        '.list',
        menu.htmlElements.map(el =>
          li(
            '.list-item',
            a(
              '.link',
              {
                attrs: {
                  title: el,
                  href: el,
                },
              },
              el,
            ),
          ),
        ),
      ),
    ),
  )

  return {
    DOM: vdom$,
    History: menuItemClick$,
  }
}

export default Menu
