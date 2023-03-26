import React, { Component } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";

class UpdateContact extends Component {
    constructor(props) {
        super(props);

        // initialize state
        this.state = {
            name: "",
            email: "",
            phone: "",
            address: {
                city: "",
            },
            showAlert: false,
        };
    }

    // function to toggle alert message
    toggleAlert = (val) => {
        this.setState({
            showAlert: val,
        });
        setTimeout(() => {
            this.setState({
                showAlert: !val,
            });
        }, 6000); // hide alert after 6 seconds
    };

    // function to handle input change for non-address fields
    handleInputChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    // function to handle input change for address fields
    handleAddressInputChange = (field, value) => {
        // handle all address fields
        this.setState({
            address: {
                ...this.state.address, // spread previous value
                [field]: value, // update new value of field
            },
        });
    };

    // function to handle form submission
    onFormSubmit = (e) => {
        e.preventDefault();
        const userId = this.props.user.id;
        let url = `https://jsonplaceholder.typicode.com/users/1`;
        const { name, email, phone, address } = this.state;

        // check if all required fields are filled in
        if (name && email && phone && address.city) {
            fetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    address,
                    userId,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((user) => {
                    console.log(user);
                    // call update contact function
                    this.props.updateContact(user);
                    this.props.hideForm();
                });
        } else {
            // show alert if required fields are not filled in
            this.toggleAlert(true);
        }
    };

    render() {
        const { email, name, phone, address } = this.props.user;
        const { showAlert } = this.state;

        return (
            <Container className="m-3">
                <Form
                    className="border border-secondary p-4 border-3 rounded"
                    style={{ width: "22rem" }}
                >
                    <Row>
                        {showAlert && (
                            // show alert if required fields are not filled in
                            <Alert variant="info">
                                Please fill in new or existing records...
                            </Alert>
                        )}
                    </Row>
                    {/* form inputs */}
                    <Button
                        variant="danger"
                        className="my-3"
                        onClick={this.props.hideForm}
                    >
                        Close Form
                    </Button>
                    <Row>
                        {" "}
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={name}
                                onChange={(e) => this.handleInputChange("name", e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    
                    <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder={email}
                                onChange={(e) =>
                                    this.handleInputChange("email", e.target.value)
                                }
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-2">
                        <Form.Group as={Col} controlId="formGridPhonenumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={phone}
                                onChange={(e) =>
                                    this.handleInputChange("phone", e.target.value)
                                }
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={address.city}
                                onChange={(e) =>
                                    this.handleAddressInputChange("city", e.target.value)
                                }
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit" onClick={this.onFormSubmit}>
                        UpdateContact
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default UpdateContact;