import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import '../App.css';
import api from '../API/scotch'

class ListList extends Component {
    
  constructor(props) {
    super(props);
    this.state = {lists: []};
    this.api = new api()
  }
  
  componentDidMount() {
    this.api.getLists().then(data => this.setState({lists: data}));
  }

  render () {
    return (
      <>
        <DataTable value={this.state.lists} paginator={true} rows={20} autoLayout={true} dataKey="id" className="p-datatable-scotchy">
          <Column field="wishListName" header="List" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="description" header="Description" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="dateAdded" header="Date Created" sortable={true} filter={true} filterMatchMode="contains"/>
        </DataTable>
      </>
    )
  }
}

export default ListList;
