import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { fetchPrices } from '../Redux/actions/prices'

import '../App.css';

class PriceList extends Component {
    
  componentDidMount() {
    this.props.fetchPrices()
  }

  render () {
    return (
      <>
        <DataTable value={this.props.prices} paginator={true} rows={20} autoLayout={true} dataKey="id" className="p-datatable-scotchy">
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

const mapDispatchToProps = {
  fetchPrices
}

const mapStateToProps = state => ({
  prices: state.prices.prices,
  isLoading: state.prices.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(PriceList)