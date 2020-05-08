import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux'
import { fetchStyles } from '../Redux/actions/styles'

import '../App.css';

class StyleList extends Component {
    
  componentDidMount() {
    this.props.fetchStyles()
  }

  render () {
    return (
      <>
        <DataTable value={this.props.styles} paginator={true} rows={20} autoLayout={true} dataKey="id" className="p-datatable-scotchy">
          <Column field="name" header="Style"/>
        </DataTable>
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchStyles
}

const mapStateToProps = state => ({
  styles: state.styles.styles,
  isLoading: state.styles.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(StyleList)