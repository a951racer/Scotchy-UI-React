import React, { Component } from 'react';
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'
import { deletePrice } from '../../Redux/actions/prices'

import '../../App.css';

class DeletePriceDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayDialog: false
    }
    this.delete = this.delete.bind(this)
    this.cancelDeletePrice = this.cancelDeletePrice.bind(this)
    this.deletePrice = this.deletePrice.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  // Delete Price //

  delete() {
    this.toggleDialog()
  }

  cancelDeletePrice() {
    this.setState({newPrice: {}})
    this.toggleDialog()
  }

  async deletePrice() {
    await this.props.deletePrice(this.props.outPrice)
    this.toggleDialog()
  }

  toggleDialog() {
    this.setState({displayDialog: !this.state.displayDialog})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancelDeletePrice}/>
                        <Button label="Delete" icon="pi pi-trash" className="scotchy-button" onClick={this.deletePrice}/>
                      </div>;

    return (
      <>
        <i className="pi pi-fw pi-trash scotchy-icon-link" onClick={this.delete} ></i>

        <Dialog visible={this.state.displayDialog} price={{width:'300px'}} header="Delete Price" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
          {
            <div className="p-grid p-fluid">
              <span>Confirm:  Delete price for {this.props.outPrice.dramName}?</span>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { deletePrice }

export default connect(null, mapDispatchToProps)(DeletePriceDialog)