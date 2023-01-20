import React, { Component } from 'react'

export default class extends Component {

    render = () =>
        <tr>
            <td>{this.props.item.action}</td>
            <td>
                <input type="checkbox" checked={this.props.item.done}
                    onChange={() => this.props.callback(this.props.item)}
                />
            </td>
        </tr>
    }



/*  <td>{this.props.item.action}</td> => gets the item action result */
/*  <input type="checkbox" checked={this.props.item.done} => item done value if true of false */
/* onChange={() => this.props.callback(this.props.item)} => changes done value */