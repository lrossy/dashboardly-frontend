import React, { Component } from 'react';

import './Modal.css';

export default class Modal extends Component {
    render() {
        if (this.props.isOpen === false)
            return null;

        return (
            <div className={this.props.containerClassName}>
                <div className={this.props.className}>
                    {this.props.children}
                </div>
                {!this.props.noBackdrop &&
                <div className={this.props.backdropClassName}
                     onClick={e => this.close(e)}> </div>}
            </div>
        )
    }

    close(e) {
        e.preventDefault()

        if (this.props.onClose) {
            this.props.onClose()
        }
    }
}