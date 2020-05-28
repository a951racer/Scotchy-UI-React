import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Growl } from 'primereact/growl';
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { connect } from 'react-redux'
import { fetchScotches,
         saveScotch,
         createScotch,
         deleteScotch
        } from '../../Redux/actions/scotches'
import { fetchStyles } from '../../Redux/actions/styles'
import { fetchRegions } from '../../Redux/actions/regions'

import '../../App.css'

class ScotchList extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      inStock: null,
      age: null,
      style: null,
      region: null,
      selectedScotch: null,
      displayNewDialog: false,
      editingScotch: null,
    };

    this.updateProperty = this.updateProperty.bind(this)
    this.textEditor = this.textEditor.bind(this);
    this.checkboxEditor = this.checkboxEditor.bind(this);
    this.dropdownEditor = this.dropdownEditor.bind(this)

    this.inStockTemplate = this.inStockTemplate.bind(this);
    this.deleteButtonTemplate = this.deleteButtonTemplate.bind(this)
    this.detailTemplate = this.detailTemplate.bind(this)

    this.onInStockFilterChange = this.onInStockFilterChange.bind(this);
    this.onStyleFilterChange = this.onStyleFilterChange.bind(this);
    this.onRegionFilterChange = this.onRegionFilterChange.bind(this);
    this.inStockFilter = this.inStockFilter.bind(this);

    this.onRowEditInit = this.onRowEditInit.bind(this);
    this.onRowEditSave = this.onRowEditSave.bind(this);
    this.onRowEditCancel = this.onRowEditCancel.bind(this);

    this.addNew = this.addNew.bind(this)
    this.cancelNewScotch = this.cancelNewScotch.bind(this)
    this.saveNewScotch = this.saveNewScotch.bind(this)
    this.deleteScotch = this.deleteScotch.bind(this)
 }
  
  async componentDidMount() {
    this.props.fetchScotches()
    this.props.fetchStyles()
    this.props.fetchRegions()
  }

// Row Edit Functions
  onRowEditInit(event) {
    const scotch = {...event.data}
    this.setState({editingScotch: scotch})
  }

  async onRowEditSave(event) {
    await this.props.saveScotch(this.state.editingScotch)
    this.setState({editingScotch: null})
    this.growl.show({severity: 'success', summary: 'Saved', detail: 'Cabinet has been updated'});
  }

  onRowEditCancel(event) {
    this.setState({
        editingScotch: null
    })
  }

// Editor control functions
  updateProperty(property, value) {
    const scotch = {...this.state.editingScotch, [property]: value}
    this.setState({
      editingScotch: scotch
    })
  }

// Editors
  textEditor(props) {
    return <InputText type="text" value={this.state.editingScotch[props.field]} onChange={(e) => this.updateProperty(props.field, e.target.value)} />;
  }

  checkboxEditor(props) {
    return <Checkbox onChange={(e) => this.updateProperty(props.field, e.target.checked)} checked={this.state.editingScotch[props.field]} />
  }

  dropdownEditor(props) {
    const options = props.field + 's'
    return <Dropdown value={this.state.editingScotch[props.field]} options={this.props[options]} optionLabel="name" optionValue="name" style={{width: '10em'}} scrollHeight='100px' onChange={(e) => this.updateProperty(props.field, e.target.value)} />
  }

//Templates
  inStockTemplate(rowData, column) {
    return <Checkbox checked={rowData.inStock} />
  }

  deleteButtonTemplate(rowData) {
    return (
      <i className="pi pi-fw pi-trash scotchy-icon-link" onClick={() => this.deleteScotch(rowData)} ></i>
    );
  }

  detailTemplate(rowData) {
    return (
      <i className="pi pi-fw pi-search scotchy-icon-link" onClick={() => this.toggleDialog(rowData)} style={{width: '.1em'}}></i>
    );
  }

// Filters
  onInStockFilterChange(event) {
    this.dt.filter(event.value, 'inStock', 'custom');
    this.setState({inStock: event.value});
  }

  inStockFilter(value, filter) {
    return (filter && value) || (!filter && !value)
  }

  onStyleFilterChange(event) {
    this.dt.filter(event.value, 'style', 'contains');
    this.setState({style: event.value});
  }

  onRegionFilterChange(event) {
    this.dt.filter(event.value, 'region', 'contains');
    this.setState({region: event.value});
  }

// Add New Scotch //

  addNew() {
    this.setState(
      {
        editingScotch: {
          distillerName: '',
          flavor: '',
          age: '',
          style: '',
          region: '',
          inStock: false
        },
        displayNewDialog: true
      }
    )
  }

  cancelNewScotch() {
    this.setState({
      displayNewDialog: false,
      editingScotch: null
    })
  }

  async saveNewScotch() {
    await this.props.createScotch(this.state.editingScotch)
    this.setState({
      displayNewDialog: false,
      editingScotch: null
    })
    this.growl.show({severity: 'success', summary: 'Created', detail: 'New scotch has been added to your cabinet'});
  }

// Delete Scotch //
  async deleteScotch(scotch) {
    await this.props.deleteScotch(scotch)
    this.setState({selectedScotch: null})
    this.growl.show({severity: 'success', summary: 'Deleted', detail: 'Scotch has been removed from your cabinet'});
  }

///////  RENDER /////////////
  render () {
    let inStockFilterInput = <TriStateCheckbox value={this.state.inStock} onChange={this.onInStockFilterChange}/>
    let styleFilterInput = <Dropdown value={this.state.style} options={this.props.styles} optionLabel="name" optionValue="name" showClear={true} style={{width: '10em'}} onChange={this.onStyleFilterChange} placeholder="Filter by style"/>
    let regionFilterInput = <Dropdown value={this.state.region} options={this.props.regions} optionLabel="name" optionValue="name" showClear={true} style={{width: '11em'}} onChange={this.onRegionFilterChange} placeholder="Filter by region"/>
    let newDialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancelNewScotch}/>
        <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={this.saveNewScotch}/>
      </div>;

    return (
        this.props.isLoading ? <span style={{textAlight: 'center'}}><ProgressSpinner/></span> :
          <>
            <Button type="button" label="New" icon="pi pi-fw pi-plus" className="p-button-primary scotchy-button"  onClick={this.addNew} ></Button>
            
            <DataTable
              ref={(el) => { this.dt = el; }}
              value={this.props.scotches}
              paginator={true}
              rows={15}
              rowHover={true}
              autoLayout={true}
              dataKey="id"
              editMode="row"
              className="p-datatable-scotchy"
              onRowEditInit={this.onRowEditInit}
              onRowEditSave={this.onRowEditSave}
              onRowEditCancel={this.onRowEditCancel}
              selectionMode="single"
              selection={this.state.selectedScotch}
              onSelectionChange={e => this.setState({selectedScotch: e.value})}
            >
              <Column body={this.detailTemplate}></Column>
              <Column field="distillerName" header="Distiller" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor}/>
              <Column field="flavor" header="Flavor" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor}/>
              <Column field="age" header="Age" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor} filterHeaderStyle={{width: '5.5em'}} style={{textAlign: 'center'}}/>
              <Column field="style" header="Style" sortable={true} filter={true} filterMatchMode="contains" filterElement={styleFilterInput} editor={this.dropdownEditor}/>
              <Column field="region" header="Region" sortable={true} filter={true} filterMatchMode="contains" filterElement={regionFilterInput} editor={this.dropdownEditor}/>
              <Column field="inStock" header="In Stock" filter={true} filterMatchMode="custom"  filterFunction={this.inStockFilter} filterElement={inStockFilterInput} body={this.inStockTemplate} style={{textAlign:'center'}} editor={this.checkboxEditor}/>
              <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
              <Column body={this.deleteButtonTemplate} />
            </DataTable>

            <Growl ref={(el) => this.growl = el} />

            <Dialog visible={this.state.displayNewDialog} style={{width:'300px'}} header="New Scotch" modal={true} footer={newDialogFooter} onHide={() => this.setState({displayNewDialog: false})}>
              {
                this.state.editingScotch &&

                <div className="p-grid p-fluid">
                    <div className="p-col-4 scotchy-form-label"><label htmlFor="distillerName">Distiller</label></div>
                    <div className="p-col-8">
                      <InputText id="distillerName" onChange={(e) => {this.updateProperty('distillerName', e.target.value)}} value={this.state.editingScotch.distllerName}/>
                    </div>

                    <div className="p-col-4 scotchy-form-label" style={{marginTop: '.8em'}}><label htmlFor="flavor">Flavor</label></div>
                    <div className="p-col-8">
                      <InputText id="flavor" onChange={(e) => {this.updateProperty('flavor', e.target.value)}} value={this.state.editingScotch.flavor}/>
                    </div>

                    <div className="p-col-4 scotchy-form-label" style={{marginTop: '.8em'}}><label htmlFor="age">Age</label></div>
                    <div className="p-col-8">
                      <InputText id="age" style={{width: '3em'}} onChange={(e) => {this.updateProperty('age', e.target.value)}} value={this.state.editingScotch.age}/>
                    </div>

                    <div className="p-col-4 scotchy-form-label" style={{marginTop: '.8em'}}><label htmlFor="style">Style</label></div>
                    <div className="p-col-8">
                      <Dropdown value={this.state.editingScotch.style} options={this.props.styles} optionLabel="name" optionValue="name" scrollHeight='100px' onChange={(e) => {this.updateProperty('style', e.target.value)}} />
                    </div>
                    <div className="p-col-4 scotchy-form-label" style={{marginTop: '.8em'}}><label htmlFor="style">Region</label></div>
                    <div className="p-col-8">
                      <Dropdown value={this.state.editingScotch.region} options={this.props.regions} optionLabel="name" optionValue="name" scrollHeight='100px' onChange={(e) => {this.updateProperty('region', e.target.value)}}/>
                    </div>

                    <div className="p-col-4 scotchy-form-label" style={{marginTop: '.8em'}}><label htmlFor="inStock" style={{marginRight: '.5em'}}>In Stock?</label>
                      <Checkbox onChange={(e) => this.updateProperty('inStock', e.target.checked)} checked={this.state.editingScotch.inStock} />
                    </div>
                </div>
              }
            </Dialog>
          </>
    )
  }
}

const mapDispatchToProps = {
  fetchScotches,
  fetchStyles,
  fetchRegions,
  saveScotch,
  createScotch,
  deleteScotch
}

const mapStateToProps = state => ({
  scotches: state.scotches.scotches,
  styles: state.styles.styles,
  regions: state.regions.regions,
  isLoading: state.scotches.isLoading,
  isUpdating: state.scotches.isUpdating
})

export default connect(mapStateToProps, mapDispatchToProps)(ScotchList)