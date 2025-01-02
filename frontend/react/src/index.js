  // import React from 'react';
  // import ReactDOM from 'react-dom';
  // import { BrowserRouter as Router } from 'react-router-dom';
  // import App from './App';
  // import './index.css'; // Tailwind CSS

  // ReactDOM.render(
  //   <Router>
  //     <App />
  //   </Router>,
  //   document.getElementById('root')
  // );


  import React from 'react';
  import ReactDOM from 'react-dom';
  import { Provider } from 'react-redux';
  import { BrowserRouter as Router } from 'react-router-dom';
  import store from './store';
  import App from './App';
  import './index.css'; // Tailwind CSS

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
