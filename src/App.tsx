import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';
import Alert, {AlertType, close} from './components/Alert/Alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

import Tabs from './components/Tabs/Tabs';
import TabItem from './components/Tabs/TabItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button autoFocus>Hello world</Button>
        <Button
            size={ButtonSize.Small}
            btnType={ButtonType.Danger}
            disabled>
            Disabled Button
        </Button>
        <Button
            size={ButtonSize.Large}
            btnType={ButtonType.Primary}>
            Large Primary
        </Button>
        <Button
            onClick={() => {alert(123123)}}
            size={ButtonSize.Small}
            btnType={ButtonType.Danger}>
            Small Danger
        </Button>
        <Button
            btnType={ButtonType.Link}
            target="_blank"
            href="https://www.baidu.com">
            Baidu Link
        </Button>
        <Button
            btnType={ButtonType.Link}
            disabled
            href="https://www.baidu.com">
            Disabled Link
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <div
            style={{
              width: "500px",
              margin: "20px"
            }}>
            <Alert
                title="这是一个alert组件标题"
                showClose={close.Show}>
                this is a default alert components
            </Alert>
            <Alert
                type={AlertType.Danger}
                title="这是一个alert组件标题">
            </Alert>
            <Alert
                showClose={close.Hidden}
                type={AlertType.Success}
                title="这是一个alert组件标题">
                this is a success alert components
                并且不显示关闭按钮
            </Alert>
            <Alert
                type={AlertType.Warning}
                title="这是一个alert组件标题">
                this is a warning
            </Alert>
            <Menu>
                <MenuItem>1</MenuItem>
                <SubMenu title={'11111'}>
                    <MenuItem>1</MenuItem>
                    <MenuItem>2</MenuItem>
                </SubMenu>
                <MenuItem>2</MenuItem>
            </Menu>
            {/* <Menu defaultIndex={0}>
                <MenuItem index={0}>Link 0</MenuItem>
                <MenuItem index={1} disabled>Link 1</MenuItem>
                <MenuItem index={2}>Link 2</MenuItem>
                <MenuItem index={3}>Link 3</MenuItem>
                <MenuItem index={4}>Link 4</MenuItem>
            </Menu> */}
            <Menu defaultIndex="0" mode="vertical" defaultSubMenus={['1']}>
                <MenuItem index="0">Link 0</MenuItem>
                <MenuItem index="1" disabled>Link 1</MenuItem>
                <SubMenu index="2" title={'text'}>
                    <MenuItem index="2-0">1</MenuItem>
                    <MenuItem index="2-1">2</MenuItem>
                </SubMenu>
                <MenuItem index="3">Link 3</MenuItem>
                <MenuItem index="4">Link 4</MenuItem>
            </Menu>
            11111
            <Tabs defaultIndex={0} onSelect={(index) => {alert(index)}}>
              <TabItem label="card1">this is card one</TabItem>
              <TabItem label="card2">this is card two</TabItem>
              <TabItem label="disabled" disabled>this is card three</TabItem>
            </Tabs>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
