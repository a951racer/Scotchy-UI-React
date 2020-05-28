import React, { Component } from 'react';
import moment from 'moment'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { fetchLists } from '../../Redux/actions/lists'

import DeleteListDialog from './DeleteListDialog'
import NewListDialog from './NewListDialog'
import EditListDialog from './EditListDialog'
import ListDetailsDialog from './ListDetailsDialog'

import '../../App.css';

class ListList extends Component {
    
  constructor(props) {
    super(props)

    this.dateTemplate = this.dateTemplate.bind(this)
    this.detailsButtonTemplate = this.detailsButtonTemplate.bind(this)
    this.deleteButtonTemplate = this.deleteButtonTemplate.bind(this)
    this.editButtonTemplate = this.editButtonTemplate.bind(this)
  }
  componentDidMount() {
    this.props.fetchLists()
  }

  dateTemplate(rowData) {
    return (
      <>
        { moment(rowData.dateAdded).format('L') }
      </>
    )
  }

  detailsButtonTemplate(rowData) {
    return ( <ListDetailsDialog list={rowData} mode={'read-only'}/> );
  }

  deleteButtonTemplate(rowData) {
    return ( <DeleteListDialog outList={rowData}/> );
  }

  editButtonTemplate(rowData) {
    return ( <EditListDialog list={rowData} mode={'edit'} /> );
  }

  render () {
    return (
      <>
        <NewListDialog />
        <DataTable
          value={this.props.lists}
          paginator={true}
          rows={20}
          rowHover={true}
          autoLayout={true}
          dataKey="_id"
          className="p-datatable-scotchy"
        >
          <Column body={this.detailsButtonTemplate} bodyStyle={{width: '2em'}}/>
          <Column field="wishListName" header="List" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="description" header="Description" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="dateAdded" body={this.dateTemplate} header="Created" sortable={true} style={{textAlign: 'right', width: '8em'}}/>
          <Column body={this.editButtonTemplate} bodyStyle={{width: '2em'}}/>
          <Column body={this.deleteButtonTemplate} bodyStyle={{width: '2em'}}/>
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