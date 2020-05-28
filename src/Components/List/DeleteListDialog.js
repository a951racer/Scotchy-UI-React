import React, { Component } from 'react';
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'
import { deleteList } from '../../Redux/actions/lists'

import '../../App.css';

class DeleteListDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayDialog: false
    }
    this.cancel = this.cancel.bind(this)
    this.delete = this.delete.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  cancel() {
    this.toggleDialog()
  }

  async delete() {
    await this.props.deleteList(this.props.outList)
    this.toggleDialog()
  }

  toggleDialog() {
    this.setState({displayDialog: !this.state.displayDialog})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancel}/>
                        <Button label="Delete" icon="pi pi-trash" className="scotchy-button" onClick={this.delete}/>
                      </div>;

    return (
      <>
        <i className="pi pi-fw pi-trash scotchy-icon-link" onClick={this.toggleDialog} ></i>

        <Dialog visible={this.state.displayDialog} style={{width:'300px'}} header="Delete List" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
          {
            <div className="p-grid p-fluid">
              <span>Confirm:  Delete list '{this.props.outList.wishListName}'?</span>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { deleteList }

export default connect(null, mapDispatchToProps)(DeleteListDialog)