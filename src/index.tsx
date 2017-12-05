import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { UserStore } from './stores/userStore';
import { ProductStore } from './stores/ProductStore';

ReactDOM.render(<App userStore={new UserStore()} prodctStore={new ProductStore()} />, document.getElementById('app'));