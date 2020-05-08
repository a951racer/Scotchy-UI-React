import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { fetchLists } from '../Redux/actions/lists'

import '../App.css';

class ListList extends Component {
    
  componentDidMount() {
    this.props.fetchLists()
  }

  render () {
    return (
      <>
        <DataTable value={this.props.lists} paginator={true} rows={20} autoLayout={true} dataKey="id" className="p-datatable-scotchy">
          <Column field="wishListName" header="List" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="description" header="Description" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="dateAdded" header="Date Created" sortable={true} filter={true} filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchLists
}

const mapStateToProps = state => ({
  lists: state.lists.lists,
  isLoading: state.lists.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(ListList)