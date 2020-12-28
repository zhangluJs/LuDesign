import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';
import Alert, {AlertType, close} from './components/Alert/Alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

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
            <Menu defaultIndex={0}>
                <MenuItem index={0}>Link 0</MenuItem>
                <MenuItem index={1} disabled>Link 1</MenuItem>
                <MenuItem index={2}>Link 2</MenuItem>
                <MenuItem index={3}>Link 3</MenuItem>
                <MenuItem index={4}>Link 4</MenuItem>
            </Menu>
            <Menu defaultIndex={0} mode="vertical">
                <MenuItem index={0}>Link 0</MenuItem>
                <MenuItem index={1} disabled>Link 1</MenuItem>
                <MenuItem index={2}>Link 2</MenuItem>
                <MenuItem index={3}>Link 3</MenuItem>
                <MenuItem index={4}>Link 4</MenuItem>
            </Menu>
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
