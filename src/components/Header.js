import React, { useState } from "react";
import { Button, Modal } from 'reactstrap';
import ModalComponent from "./AddUpdateModal";

const HeaderComponent = () => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <div className="row m-0 mt-10">
            <div className="col-md-10">
                <h4>Todo APP</h4>
            </div>

            <div className="col-md-2">
                <Button color="primary"
                    onClick={() => { setModal(true) }}
                    style={{
                        borderRadius: "50%",
                        fontSize: "18px",
                        fontWeight: "bold"
                    }}>
                    +
                </Button>
            </div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalComponent isOpen={modal} toggle={toggle} isAdd={true} />
            </Modal>
        </div>
    )
}

export default HeaderComponent;