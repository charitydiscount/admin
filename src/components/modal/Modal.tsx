import React from "react";


class Modal extends React.Component {

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <div className="modal fade" id="mediumModal" role="dialog"
                     aria-labelledby="mediumModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="mediumModalLabel">Medium Modal</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    There are three species of zebras: the plains zebra, the mountain zebra and the
                                    Grévy's zebra. The plains zebra and the mountain
                                    zebra belong to the subgenus Hippotigris, but Grévy's zebra is the sole species of
                                    subgenus Dolichohippus. The latter
                                    resembles an ass, to which it is closely related, while the former two are more
                                    horse-like. All three belong to the
                                    genus Equus, along with other living equids.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Modal;


