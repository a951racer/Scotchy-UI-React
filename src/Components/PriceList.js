import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'App.css';
import ScotchService from 'Services/scotch-service'

class PriceList extends Component {
    
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
        <DataTable value={this.state.prices} paginator={true} rows={20} autoLayout={true} dataKey="id" className="p-datatable-scotchy">
          <Column field="dramName" header="Dram" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="location" header="Location" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="price" header="Price" sortable={true} style={{textAlign: 'right'}} />
          <Column field="tax" header="Tax" sortable={true} style={{textAlign: 'right'}} />
          <Column field="shipping" header="Shipping" sortable={true} style={{textAlign: 'right'}} />
          <Column field="total" header="Total" sortable={true} style={{textAlign: 'right'}} />
          <Column field="comment" header="Comment" sortable={true} filter={true} filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

export default PriceList;
