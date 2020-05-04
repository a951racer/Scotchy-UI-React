import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';

import '../App.css';
import ScotchService from '../Services/scotch-service'

class Settings extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      styles: [],
      regions: []
    };
    this.scotchservice = new ScotchService()
  }
  
  componentDidMount() {
    this.scotchservice.getStyles().then(data => this.setState({styles: data}));
    this.scotchservice.getRegions().then(data => this.setState({regions: data}));
  }

  render () {
    return (
      <>
        <h4>Styles</h4>
        <DataTable value={this.state.styles} paginator={true} rows={20} autoLayout="true" dataKey="id">
          <Column field="name" header="Style"/>
          </DataTable>
        <h4>Regions</h4>
        <DataTable value={this.state.regions} paginator={true} rows={20} autoLayout="true" dataKey="id">
          <Column field="name" header="Region" sortable="true" filter="true" filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

export default Settings;
