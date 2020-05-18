import React, { Component } from 'react';
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import { Dialog } from 'primereact/dialog'
import { connect } from 'react-redux'
import { createStyle } from '../../Redux/actions/styles'

import '../../App.css';

class NewStyleDialog extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      displayDialog: false,
      newStyle: {
        name: ''
      }
    }
    this.updateProperty = this.updateProperty.bind(this)
    this.addNew = this.addNew.bind(this)
    this.cancelNewStyle = this.cancelNewStyle.bind(this)
    this.saveNewStyle = this.saveNewStyle.bind(this)
    this.toggleDialog = this.toggleDialog.bind(this)
  }

  updateProperty(property, value) {
    const style = {...this.state.newStyle, [property]: value}
    this.setState({
      newStyle: style
    })
  }

  // Add New Style //

  addNew() {
    this.setState({newStyle: {name: ''}})
    this.toggleDialog()
  }

  cancelNewStyle() {
    this.setState({newStyle: {}})
    this.toggleDialog()
  }

  async saveNewStyle() {
    await this.props.createStyle(this.state.newStyle)
    this.setState({newStyle: {}})
    //this.growl.show({severity: 'success', summary: 'Created', detail: 'New style has been added.'});
    this.toggleDialog()
  }

  toggleDialog() {
    this.setState({displayDialog: !this.state.displayDialog})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancelNewStyle}/>
                        <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={this.saveNewStyle}/>
                      </div>;

    return (
      <>
        <Button type="button" label="New" icon="pi pi-fw pi-plus" className="p-button-primary scotchy-button"  onClick={this.addNew} ></Button>

        <Dialog visible={this.state.displayDialog} style={{width:'300px'}} header="New Style" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
          {
            <div className="p-grid p-fluid">
                <div className="p-col-4 scotchy-form-label"><label htmlFor="name">Style</label></div>
                <div className="p-col-8">
                  <InputText id="name" onChange={(e) => {this.updateProperty('name', e.target.value)}} value={this.state.newStyle.name}/>
                </div>
            </div>
          }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { createStyle }

const mapStateToProps = state => ({
  styles: state.styles.styles
})

export default connect(mapStateToProps, mapDispatchToProps)(NewStyleDialog)