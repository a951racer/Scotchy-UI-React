import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext'
import { InputNumber } from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'
import { createPrice } from '../../Redux/actions/prices'
import { fetchScotches } from '../../Redux/actions/scotches'

import '../../App.css';

class NewPriceDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayDialog: false,
      newPrice: {
        scotchId: '',
        dramName: '',
        location: '',
        dateAdded: '',
        price: '',
        tax: '',
        shipping: '',
        total: '',
        comment: ''
      }
    }
    this.updateProperty = this.updateProperty.bind(this)
    this.addNew = this.addNew.bind(this)
    this.cancelNewPrice = this.cancelNewPrice.bind(this)
    this.saveNewPrice = this.saveNewPrice.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  componentDidMount() {
    this.props.fetchScotches()
  }

  updateProperty(property, value) {
    const price = {...this.state.newPrice, [property]: value}
    this.setState({
      newPrice: price
    })
  }

  // Add New Price //

  addNew() {
    this.setState({newPrice: {name: ''}})
    this.toggleDialog()
  }

  cancelNewPrice() {
    this.setState({newPrice: {}})
    this.toggleDialog()
  }

  async saveNewPrice() {
    await this.props.createPrice(this.state.newPrice)
    this.setState({newPrice: {}})
    //this.growl.show({severity: 'success', summary: 'Created', detail: 'New price has been added.'});
    this.toggleDialog()
  }

  toggleDialog() {
    this.setState({displayDialog: !this.state.displayDialog})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancelNewPrice}/>
                        <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={this.saveNewPrice}/>
                      </div>;

    return (
      <>
        <Button type="button" label="New" icon="pi pi-fw pi-plus" className="p-button-primary scotchy-button"  onClick={this.addNew} ></Button>

        <Dialog visible={this.state.displayDialog} style={{width:'300px'}} header="New Price" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
        {
            <div className="p-grid p-fluid">
                <div className="p-col-4 scotchy-form-label"><label htmlFor="scotchId">Dram</label></div>
                <div className="p-col-8">
                  <Dropdown id="scotchId" value={this.state.newPrice.scotchId} options={this.props.scotches} optionLabel="dramName" optionValue="id" style={{width: '15em'}} scrollHeight='200px' onChange={(e) => {this.updateProperty('scotchId', e.target.value)}} />
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="location">Location</label></div>
                <div className="p-col-8">
                    <InputText id="location" onChange={(e) => {this.updateProperty('location', e.target.value)}} value={this.state.newPrice.location}/>
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="dateAdded">Date</label></div>
                <div className="p-col-8">
                  <InputText id="dateAdded" onChange={(e) => {this.updateProperty('dateAdded', e.target.value)}} value={this.state.newPrice.dateAdded}/>
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="price">Price</label></div>
                <div className="p-col-8">
                  <InputNumber id="price" value={this.state.newPrice.price} onChange={(e) => this.updateProperty('price', e.target.value)}  mode="currency" currency="USD" locale="en-US" style={{width: '5em', textAlign: 'right'}}/>
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="tax">Tax</label></div>
                <div className="p-col-8">
                  <InputNumber id='tax' value={this.state.newPrice.tax} onChange={(e) => this.updateProperty('tax', e.target.value)}  mode="currency" currency="USD" locale="en-US" style={{width: '5em', textAlign: 'right'}}/>
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="shipping">Shipping</label></div>
                <div className="p-col-8">
                  <InputNumber is='shipping' value={this.state.newPrice.shipping} onChange={(e) => this.updateProperty('shipping', e.target.value)}  mode="currency" currency="USD" locale="en-US" style={{width: '5em', textAlign: 'right'}}/>
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="total">Total</label></div>
                <div className="p-col-8">
                  <InputNumber id='total' value={this.state.newPrice.total} onChange={(e) => this.updateProperty('total', e.target.value)}  mode="currency" currency="USD" locale="en-US" style={{width: '5em', textAlign: 'right'}}/>
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="comment">Comment</label></div>
                <div className="p-col-8">
                  <InputText id="comment" onChange={(e) => {this.updateProperty('comment', e.target.value)}} value={this.state.newPrice.comment}/>
                </div>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { createPrice, fetchScotches }

const mapStateToProps = state => ({
  prices: state.prices.prices,
  scotches: state.scotches.scotches,
  showDialog: state.prices.showDialog
})

export default connect(mapStateToProps, mapDispatchToProps)(NewPriceDialog)