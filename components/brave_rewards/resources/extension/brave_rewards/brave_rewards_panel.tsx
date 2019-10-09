/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Store } from 'react-chrome-redux'

import Theme from 'brave-ui/theme/brave-default'
import { ThemeProvider } from 'brave-ui/theme'
import { initLocale } from 'brave-ui/helpers'
require('emptykit.css')
require('../../../../fonts/muli.css')
require('../../../../fonts/poppins.css')

// Components
import App from './components/app'

// Utils
import { getUIMessages } from './background/api/locale_api'
import RunOrTimeout from '../../../../common/runOrTimeout'

const store: Store<RewardsExtension.State> = new Store({
  portName: 'REWARDSPANEL'
})

initLocale(getUIMessages())

RunOrTimeout(store.ready(), 2000).then(() => {
  render(
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  )
})
.catch((e: any) => {
  console.error('Problem mounting rewards panel', e)
})
