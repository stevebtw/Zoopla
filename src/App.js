import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducer';

import FetchData from './utils/FetchData';
import Header from './components/Header';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import PropertyForm from './components/PropertyForm';
import About from './components/About';

import './App.css';
import 'typeface-roboto';

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <FetchData />

          <Header />

          <Switch>
            <Route path="/about" component={About} />
            <Route path="/new" component={PropertyForm} />
            <Route path="/:id" component={PropertyDetails} />
            <Route path="/" component={PropertyList} exact />
          </Switch>

        </div>
      </BrowserRouter></Provider>
  );
}

export default App;
