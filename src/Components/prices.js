import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';

import '../App.css';
import ScotchService from '../Services/scotch-service'

class Prices extends Component {
    
  constructor(props) {
    super(props);
    this.state = {prices: []};
    this.scotchservice = new ScotchService()
  }
  
  componentDidMount() {
    this.scotchservice.getPrices().then(data => this.setState({prices: data}));
  }

  render () {
    return (
      <>
        <DataTable value={this.state.prices} paginator={true} rows={20} autoLayout="true" dataKey="id">
          <Column field="dramName" header="Dram" sortable="true" filter="true" filterMatchMode="contains"/>
          <Column field="location" header="Location" sortable="true" filter="true" filterMatchMode="contains"/>
          <Column field="price" header="Price" sortable="true"/>
          <Column field="tax" header="Tax" sortable="true"/>
          <Column field="shipping" header="Shipping" sortable="true"/>
          <Column field="total" header="Total" sortable="true"/>
          <Column field="comment" header="Comment" sortable="true" filter="true" filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

export default Prices;
