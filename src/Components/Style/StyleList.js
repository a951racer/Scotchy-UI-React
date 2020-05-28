import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'
import { Growl } from 'primereact/growl';
import { connect } from 'react-redux'
import { fetchStyles, saveStyle } from '../../Redux/actions/styles'

import NewStyleDialog from './NewStyleDialog'
import DeleteStyleDialog from './DeleteStyleDialog'
import '../../App.css';

class StyleList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      editingStyle: null,
    }
    this.textEditor = this.textEditor.bind(this);

    this.deleteButtonTemplate = this.deleteButtonTemplate.bind(this)

    this.onRowEditInit = this.onRowEditInit.bind(this);
    this.onRowEditSave = this.onRowEditSave.bind(this);
    this.onRowEditCancel = this.onRowEditCancel.bind(this);
  }

  componentDidMount() {
    this.props.fetchStyles()
  }

  // Row Edit Functions
  onRowEditInit(event) {
    const style = {...event.data}
    this.setState({editingStyle: style})
  }

  async onRowEditSave(event) {
    await this.props.saveStyle(this.state.editingStyle)
    this.setState({editingStyle: null})
    this.growl.show({severity: 'success', summary: 'Saved', detail: 'Style has been updated'});
  }

  onRowEditCancel(event) {
    this.setState({
        editingStyle: null
    })
  }

  // Editor control functions
  updateProperty(property, value) {
    const style = {...this.state.editingStyle, [property]: value}
    this.setState({
      editingStyle: style
    })
  }

  // Editors
  textEditor(props) {
    return <InputText type="text" value={this.state.editingStyle[props.field]} onChange={(e) => this.updateProperty(props.field, e.target.value)} />;
  }

  //Templates
  deleteButtonTemplate(rowData) {
    return ( <DeleteStyleDialog outStyle={rowData}/> );
  }

///////////////////////////
  render () {

    return (
      <>
        <NewStyleDialog />
        <DataTable
          value={this.props.styles}
          paginator={true}
          rows={15}
          rowHover={true}
          autoLayout={true}
          dataKey="_id"
          className="p-datatable-scotchy"
          editMode="row"
          onRowEditInit={this.onRowEditInit}
          onRowEditSave={this.onRowEditSave}
          onRowEditCancel={this.onRowEditCancel}
        >
          <Column field="name" header="Style" editor={this.textEditor}/>
          <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
          <Column body={this.deleteButtonTemplate} bodyStyle={{width: '2em'}}/>
        </DataTable>

        <Growl ref={(el) => this.growl = el} />
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchStyles,
  saveStyle
}

const mapStateToProps = state => ({
  styles: state.styles.styles,
  isLoading: state.styles.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(StyleList)