import React from 'react';

export interface ModalProps {
    title: string;
    onSave: Function;
    onClose: Function;
}

export const Modal: React.FunctionComponent<ModalProps> = props => {
    return (
        <React.Fragment>
            <div
                className="modal fade"
                id="mediumModal"
                role="dialog"
                aria-labelledby="mediumModalLabel"
                aria-hidden="true"
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
                                onClick={props.onClose()}
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
                                onClick={props.onClose()}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={props.onSave()}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Modal;
