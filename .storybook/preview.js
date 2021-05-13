/**
 * @file storybook配置文件
 */
import React from 'react';
import {addDecorator, addParameters} from '@storybook/react';
// info addon，可以展示组件的一些信息
import {withInfo} from '@storybook/addon-info';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
// 引入样式文件，否则在storybook中组件样式无法显示
import '../src/styles/index.scss';
import './fix_info_style.scss';

library.add(fas);

// const wrapperStyle = {
//     padding: '20px 40px',
//     width: '500px'
// };

/**
 *
 * @param {function} stroyFn
 * @returns dom
 * 通过addDecorator方法，来给storybook中添加的组件增加默认的样式
 */
// const storyWrapper = stroyFn => (
//     <div style={wrapperStyle}>
//         <h3>组件演示</h3>
//         {stroyFn()}
//     </div>
// );

// addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({info: {inline: true, header: false}});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
