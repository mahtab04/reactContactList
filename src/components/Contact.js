import React from "react";
import {
    Button,
    Card,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Modal,
} from "react-bootstrap";
import UpdateContact from "./UpdateContact";

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showUpdateForm: false,
            showDeleteModal: false,
            hideCard: false,
        };
    }

    //hide update form
    hideUpdateContactForm = () => {
        this.setState({
            showUpdateForm: false,
            hideCard: false,
        });
    };
    //handles edit contact
    handleContactEdit = () => {
        this.setState({
            showUpdateForm: true,
            hideCard: true,
        });
    };
     //hnadles delete contact
    handleDeleteContact = (userId) => {
        let url = `https://jsonplaceholder.typicode.com/users/${userId}`;
        fetch(url, {
            method: "DELETE",
        }).then((res) => {
            if (res.status === 200) {
                this.props.deleteContact(userId);
                this.setState({ showDeleteModal: false });
            }
        });
    };

    render() {
        const { user, editContact } = this.props;
        const { id, name, email, phone, address } = user;
        const { showUpdateForm, showDeleteModal, hideCard } = this.state;

        return (
            <>
                <Row>
                    {showUpdateForm ? (
                        <UpdateContact
                            updateContact={editContact}
                            user={user}
                            hideForm={this.hideUpdateContactForm}
                        />
                    ) : null}
                </Row>
                {!hideCard && (
                    <Row>
                        <Card className="contact-card mt-3" border="light">
                            <Card.Body>
                                <Card.Title>{name}</Card.Title>
                                <hr />
                                <Card.Text>{email}</Card.Text>
                                <Card.Text>{phone}</Card.Text>
                                <Card.Text>{address.city}</Card.Text>
                                <Row>
                                    <Col>
                                        <Button
                                            className="btn-block"
                                            variant="primary"
                                            onClick={this.handleContactEdit}
                                        >
                                            Edit
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            className="btn-block"
                                            variant="danger"
                                            onClick={() => this.setState({ showDeleteModal: true })}
                                        >
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Modal show={showDeleteModal} onHide={() => this.setState({ showDeleteModal: false })}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Contact</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to delete <strong>{name}</strong>?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => this.setState({ showDeleteModal: false })}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={() => this.handleDeleteContact(id)}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                )}
            </>
        );
    }
}

export default Contact;
