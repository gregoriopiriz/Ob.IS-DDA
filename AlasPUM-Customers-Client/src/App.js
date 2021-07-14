import React, { Component } from 'react';
import {
  Translator,
  T,
  LanguageList,
  Config
} from 'react-translator-component';
import {
  PageHeader,
  Row,
  Select
} from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import SearchFlightForm from './components/SearchFlighForm';
import Payment from './components/Payment';
import Passengers from './components/Passengers';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


/* Default Language */
Config.default = 'es';

/* Language List */
Config.list = {
  es: {
    text: 'Español',
    file: require('./config/locale/es')
  },
  en: {
    text: 'English',
    file: require('./config/locale/en')
  },
}

const selectLanguages = [
  {
    value: 'es',
    label: 'Español'
  },
  {
    value: 'en',
    label: 'English'
  }
]

class App extends Component {
  constructor() {
    super();

    this.state = {
      language: Config.default
    };
  }
  render() {
    return (
      <Router>
          <div>
            <PageHeader
              className="site-page-header"
              title="AlasPUM"
              extra={[
                <LanguageList Theme='Dropdown' Language={this.state.language} />,
                <Select
                  bordered={false}
                  onSelect={val => {
                    this.setState({ language: val });
                  }}
                  defaultValue={this.state.language}
                >
                  <Select.Option value='es'>Español</Select.Option>
                  <Select.Option value='en'>English</Select.Option>
                </Select>
              ]}
            />
            <div >
              <Switch>
                <Route path="/" exact>
                  <Row justify='center' align='middle' style={{ height: '60vh' }}>
                    <SearchFlightForm />
                  </Row>
                </Route>
                <Route path="/passengers">
                  <Row justify='center' style={{ height: '60vh' }}>
                    <Passengers />
                  </Row>
                </Route>
                <Route path="/payment">
                  <Row justify='center' style={{ height: '60vh' }}>
                    <Payment />
                  </Row>
                </Route>
              </Switch>
            </div>
          </div>
      </Router>
    );
  }
}

class TranslatorApp extends Component {
  render() {
    return (
      <Translator>
        <App />
      </Translator>
    );
  }
}

export default TranslatorApp;
