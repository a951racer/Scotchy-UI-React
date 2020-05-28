import React, { Component } from 'react';
import { Button } from 'primereact/button'
import { DataView } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog'

import { connect } from 'react-redux'

import { saveList } from '../../Redux/actions/lists'
import { fetchScotches } from '../../Redux/actions/scotches'

import '../../App.css';

class ListDetailsDialog extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      showDialog: false,
      list: this.props.list,
    }
    this.scotchTemplate = this.scotchTemplate.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  scotchTemplate(scotch) {
    return (
      <div className="p-clearfix">
          <div>{scotch.dramName}</div>
      </div>
    )
  }

  handleClick(list) {
    this.setState({list: list, showDialog: true})
  }

////////////////////////
  render () {
    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix" style={{textAlign: 'center'}}>
                        <Button label="Close" icon="pi pi-times" className="scotchy-button" onClick={() => this.setState({showDialog: false})}/>
                      </div>;

    return (
      <>
        <i className="pi pi-fw pi-search scotchy-icon-link" onClick={() => this.handleClick(this.props.list)} ></i>

        <Dialog visible={this.state.showDialog} header={this.state.list.wishListName} modal={true} footer={dialogFooter} onHide={() => this.setState({showDialog: false})}>
          <>
            <div className="p-grid p-fluid">
              <div className="p-col-4 scotchy-form-label"><label htmlFor="description">Description</label></div>
              <div className="p-col-8" style={{marginBottom: '1em'}}>
                {this.state.list.description}
              </div>
              <div className="p-col-4 scotchy-form-label"><label htmlFor="dateAdded">Date</label></div>
              <div className="p-col-8" style={{marginBottom: '1em'}}>
                {this.state.list.dateAdded}
              </div>

              <div className="p-col-4 scotchy-form-label"><label htmlFor="scotches">Scotches</label></div>
              <div className="p-col-8" style={{marginBottom: '1em'}}>
                <DataView value={this.state.list.scotches} layout={'list'} itemTemplate={this.scotchTemplate}></DataView>
              </div>
          </div>
          </>
        </Dialog>
      </>
    )
  }
}

const mapDispatchToProps = { fetchScotches, saveList }

const mapStateToProps = state => ({
  scotches: state.scotches.scotches
})

export default connect(mapStateToProps, mapDispatchToProps)(ListDetailsDialog)