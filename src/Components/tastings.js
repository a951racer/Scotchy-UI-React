import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';

import '../App.css';
import ScotchService from '../Services/scotch-service'

class Tastings extends Component {
    
  constructor(props) {
    super(props);
    this.state = {tastings: []};
    this.scotchservice = new ScotchService()
  }
  
  componentDidMount() {
    this.scotchservice.getTastings().then(data => this.setState({tastings: data}));
  }

  render () {
    return (
      <>
        <DataTable value={this.state.tastings} paginator={true} rows={20} autoLayout="true" dataKey="id">
          <Column field="dramName" header="Dram" sortable="true" filter="true" filterMatchMode="contains"/>
          <Column field="rating" header="Rating" sortable="true" filter="true" filterMatchMode="contains"/>
          <Column field="location" header="Location" sortable="true" filter="true" filterMatchMode="contains"/>
          <Column field="personal" header="Personal" sortable="true" filter="true" filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

export default Tastings;
