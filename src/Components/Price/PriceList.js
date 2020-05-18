import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Growl } from 'primereact/growl';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux'
import { fetchPrices, savePrice } from '../../Redux/actions/prices'

import NewPriceDialog from './NewPriceDialog'
import DeletePriceDialog from './DeletePriceDialog'
import '../../App.css';

class PriceList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      editingPrice: null,
    }
    this.textEditor = this.textEditor.bind(this);
    this.currencyEditor = this.currencyEditor.bind(this)

    this.deleteButtonTemplate = this.deleteButtonTemplate.bind(this)
    this.currencyTemplate = this.currencyTemplate.bind(this)

    this.onRowEditInit = this.onRowEditInit.bind(this);
    this.onRowEditSave = this.onRowEditSave.bind(this);
    this.onRowEditCancel = this.onRowEditCancel.bind(this);
  }

  componentDidMount() {
    this.props.fetchPrices()
  }

  // Row Edit Functions
  onRowEditInit(event) {
    const price = {...event.data}
    this.setState({editingPrice: price})
  }

  async onRowEditSave(event) {
    await this.props.savePrice(this.state.editingPrice)
    this.setState({editingPrice: null})
    this.growl.show({severity: 'success', summary: 'Saved', detail: 'Price has been updated'});
  }

  onRowEditCancel(event) {
    this.setState({
        editingPrice: null
    })
  }

  // Editor control functions
  updateProperty(property, value) {
    const price = {...this.state.editingPrice, [property]: value}
    this.setState({
      editingPrice: price
    })
  }

  // Editors
  textEditor(props) {
    return <InputText type="text" value={this.state.editingPrice[props.field]} onChange={(e) => this.updateProperty(props.field, e.target.value)} />;
  }

  currencyEditor(props) {
    return <InputNumber value={this.state.editingPrice[props.field]} onChange={(e) => this.updateProperty(props.field, e.target.value)}  mode="currency" currency="USD" locale="en-US" style={{width: '5em', textAlign: 'right'}}/>
  }

  //Templates
  deleteButtonTemplate(rowData) {
    return ( <DeletePriceDialog outPrice={rowData}/> );
  }

  currencyTemplate(rowData, column) {
    return (
      <NumberFormat value={rowData[column.field]} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix={'$'} renderText={value => <div style={{textAlign: 'right'}}>{value}</div>} />
    )
  }

///////////////////////////
  render () {

    return (
      <>
        <NewPriceDialog />
        <DataTable
          value={this.props.prices}
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
          <Column field="dramName" header="Dram" sortable={true} filter={true} filterMatchMode="contains"/>
          <Column field="location" header="Location" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor}/>
          <Column field="price" body={this.currencyTemplate} header="Price" sortable={true} price={{textAlign: 'right'}} editor={this.currencyEditor}/>
          <Column field="tax" body={this.currencyTemplate} header="Tax" sortable={true} price={{textAlign: 'right'}} editor={this.currencyEditor} />
          <Column field="shipping" body={this.currencyTemplate} header="Shipping" sortable={true} price={{textAlign: 'right'}} editor={this.currencyEditor} />
          <Column field="total" body={this.currencyTemplate} header="Total" sortable={true} price={{textAlign: 'right'}} editor={this.currencyEditor} />
          <Column field="comment" header="Comment" sortable={true} filter={true} filterMatchMode="contains" editor={this.textEditor}/>
          <Column rowEditor={true} bodyStyle={{width: '5em', textAlign: 'right'}}/>
          <Column body={this.deleteButtonTemplate} bodyPrice={{width: '2em'}}/>
        </DataTable>

        <Growl ref={(el) => this.growl = el} />
      </>
    )
  }
}

const mapDispatchToProps = {
  fetchPrices,
  savePrice
}

const mapStateToProps = state => ({
  prices: state.prices.prices,
  isLoading: state.prices.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(PriceList)