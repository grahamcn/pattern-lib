import xs from 'xstream';

// import * as module from '../../../../.menu/index.json'
const dynamicMenuImport = () => import('../../../../.menu/index.json')

const menuDriver = () => xs.fromPromise(dynamicMenuImport())
                    .map(module => module.default)
                    .map(({htmlElements}) => ({htmlElements}))

export default menuDriver