import React from 'react';
import Modal from 'react-responsive-modal';
import './modal.css';

export default class ModalContainer extends React.Component {

    render() {
        return (
            <div className="example">
                <Modal
                    open={this.props.open}
                    onClose={this.props.onClose}
                    center

                    classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}>
                    <div className="wrapper_2">
                        {this.props.children}
                    </div>
                </Modal>
            </div>
        );
    }
}