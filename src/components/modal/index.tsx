import React from 'react';
import ReactModal from 'react-modal';

export interface ModalProps {
    visible: boolean;
    title: string;
    onSave: () => void;
    onClose: () => void;
}

ReactModal.setAppElement('#root');

export const Modal: React.FunctionComponent<ModalProps> = (props) => {
    return (
        <ReactModal
            isOpen={props.visible}
            onRequestClose={props.onClose}
            shouldCloseOnOverlayClick={true}
            contentLabel="Modal used to create/update CharityDiscount models"
            role="dialog"
            aria={{
                labelledby: 'mediumModalLabel',
            }}
            style={{
                overlay: {
                    zIndex: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
                content: {
                    border: 'none',
                    background: 'transparent',
                    overflow: 'auto',
                },
            }}
        >
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="mediumModalLabel">
                            {props.title}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={props.onClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">{props.children}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={props.onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={props.onSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </ReactModal>
    );
};

export default Modal;
