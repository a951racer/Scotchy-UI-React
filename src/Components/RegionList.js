import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'App.css';
import ScotchService from 'Services/scotch-service'

class RegionList extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      regions: []
    };
    this.scotchservice = new ScotchService()
  }
  
  componentDidMount() {
    this.scotchservice.getRegions().then(data => this.setState({regions: data}));
  }

  render () {
    return (
      <>
        <DataTable value={this.state.regions} paginator={true} rows={20} autoLayout={true} dataKey="id"  className="p-datatable-scotchy">
          <Column field="name" header="Region" sortable={true} filter={true} filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

export default RegionList
