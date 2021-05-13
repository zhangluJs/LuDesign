import {addDecorator} from '@storybook/react';
import {withInfo} from '@storybook/addon-info';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import '../src/styles/index.scss';

const wrapperStyle = {
    padding: '20px 40px',
    width: '500px'
}

const storyWrapper = (stroyFn) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {stroyFn()}
    </div>
)

addDecorator(storyWrapper);
addDecorator(withInfo);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}