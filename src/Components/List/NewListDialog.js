import React, { Component } from 'react';
import { Button } from 'primereact/button'
import { PickList } from 'primereact/picklist';
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog'

import { connect } from 'react-redux'

import { createList } from '../../Redux/actions/lists'
import { fetchScotches } from '../../Redux/actions/scotches'

import '../../App.css';

class NewListDialog extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      showDialog: false,
      list: {
        wishListName: '',
        description: '',
        dateAdded: '',
        scotches: []
      },
      source: [],
      target: []
    }

    this.updateProperty = this.updateProperty.bind(this)
    this.cancel = this.cancel.bind(this)
    this.save = this.save.bind(this)
    this.scotchTemplate = this.scotchTemplate.bind(this)
  }

  componentDidMount() {
    this.props.fetchScotches()
  }

  updateProperty(property, value) {
    const list = {...this.state.list, [property]: value}
    this.setState({
      list: list
    })
  }

  scotchTemplate(scotch) {
    return (
      <div className="p-clearfix">
          <div>{scotch.dramName}</div>
      </div>
    )
  }

  cancel() {
    this.setState({
      list: {},
      source: this.props.scotches,
      target: [],
      showDialog: false
    })
  }

  async save() {
    const newList = {...this.state.list, scotches: this.state.target}
    this.props.createList(newList)
    this.setState({
      list: {},
      showDialog: false
    })
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
                        <Button label="Cancel" icon="pi pi-times" className="scotchy-button" onClick={this.cancel}/>
                        <Button label="Save" icon="pi pi-check" className="scotchy-button" onClick={this.save}/>
                      </div>;

    return (
      <>
        <Button type="button" label="New" icon="pi pi-fw pi-plus" className="p-button-primary scotchy-button"  onClick={() => this.setState({showDialog: true})} ></Button>

        <Dialog visible={this.state.showDialog} header={'New List'} modal={true} footer={dialogFooter} onHide={this.cancel}>
          {
            <>
              <div className="p-grid p-fluid">
                <div className="p-col-4 scotchy-form-label"><label htmlFor="wishListName">List Name</label></div>
                <div className="p-col-8">
                  <InputText id="wishListName" onChange={(e) => {this.updateProperty('wishListName', e.target.value)}} value={this.state.list.wishListName} style={{width: '25em', marginBottom: '1em'}}/>
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="dateAdded">Date</label></div>
                <div className="p-col-8">
                  <Calendar value={this.state.list.dateAdded} onChange={(e) => {this.updateProperty('dateAdded', e.value)}} style={{width: '7em', marginBottom: '1em'}}></Calendar>
                </div>

                <div className="p-col-4 scotchy-form-label"><label htmlFor="description">Description</label></div>
                <div className="p-col-8">
                  <InputText id="description" onChange={(e) => {this.updateProperty('description', e.target.value)}} value={this.state.list.description} style={{width: '25em', marginBottom: '2em'}}/>
                </div>
              </div>

              <PickList
                source={this.props.scotches}
                target={this.state.target}
                onChange={(e) => this.setState({source: e.source, target: e.target})}
                itemTemplate={this.scotchTemplate}
                sourceHeader="Cabinet"
                targetHeader="In List"
                sourceStyle={{height: '500px', width: '350px'}}
                targetStyle={{height: '500px', width: '350px'}}
              />
            </>
            }
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { fetchScotches, createList }

const mapStateToProps = state => ({
  scotches: state.scotches.scotches
})

export default connect(mapStateToProps, mapDispatchToProps)(NewListDialog)