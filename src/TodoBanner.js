import React, { Component } from 'react';

export default class extends Component {


    render =() =>
        <h4 className="bg-primary text-white text-center p-2">
            {this.props.name}'s List
            ({this.props.tasks.filter(t => !t.done).length} items to do)

        </h4>
    }


/* {this.props.name}'s List => user's name */
/* ({ this.props.tasks.filter (t => !t.done).length} items to do) => actions not done length using filter */