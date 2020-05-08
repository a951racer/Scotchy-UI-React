import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { fetchRegions } from '../Redux/actions/regions'

import '../App.css';

class RegionList extends Component {
    
  componentDidMount() {
    this.props.fetchRegions()
  }

  render () {
    return (
      <>
        <DataTable value={this.props.regions} paginator={true} rows={20} autoLayout={true} dataKey="id"  className="p-datatable-scotchy">
          <Column field="name" header="Region" sortable={true} filter={true} filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchRegions
}

const mapStateToProps = state => ({
  regions: state.regions.regions,
  isLoading: state.regions.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(RegionList)