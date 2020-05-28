import React, { Component } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';

import '../App.css';
import StyleList from './Style/StyleList'
import RegionList from './Region/RegionList';

class Settings extends Component {

  constructor() {
    super()
    this.state = {
      activeIndex: null
    }
  }

  render () {
    return (
      <>
        <TabView>
          <TabPanel header="Styles">
            <StyleList />
          </TabPanel>
          <TabPanel header="Regions">
            <RegionList />
          </TabPanel>
        </TabView>
      </>
    )
  }
}

export default Settings;
