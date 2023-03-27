import React from "react";
import { Container, Button, Row, CardGroup, Col } from "react-bootstrap";

import Contact from "./Contact";
import ContactForm from "./ContactForm";
import { userApi } from "../API/url";
import Header from "./Header";

class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], // array of users to display
            showAddform: false, // whether to show the contact form or not
            lastId: 10, // ID of the last added contact
            lastDeletedIndex: -1, // index of the last deleted contact in the users array
        };
    }

    // Fetch the list of users from the API when the component mounts
    componentDidMount() {
        fetch(userApi)
            .then((res) => res.json())
            .then((users) => {
                console.log(users);
                this.setState({
                    users: users,
                });
            });
    }

    // Toggle the display of the contact form
    toggleAddForm = (val) => {
        this.setState({
            showAddform: val,
        });
    };

    // Handle the submission of the contact form
    handleformSubmit = (user) => {
        const { users } = this.state;

        // Correct the ID of the new user
        user.id = this.state.lastId + 1;

        // Add the new user to the users array
        let newArray = [...users];
        newArray.push(user);

        this.setState({
            showAddform: false,
            lastId: user.id,
            users: [...newArray],
        });

        // Scroll to the bottom of the page
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "auto",
        });
    };

    // Handle the update of a contact
    handleUpdateContact = (user) => {
        const { users, lastDeletedIndex } = this.state;
        user.id = user.userId;
        let newArray = [...users];
        let length = newArray.length;
        let { lastId } = this.state;
        let diff = lastId - length;

        // If the contact was deleted, update it in its original position
        if (user.id <= lastDeletedIndex) {
            newArray[user.id - 1] = user;
        }
        // Otherwise, update it in its current position
        else {
            newArray[user.id - diff - 1] = user;
        }

        console.log(newArray);
        this.setState({
            users: newArray,
        });
    };

    // Handle the deletion of a contact
    handleDeleteContact = (userId) => {
        const { users } = this.state;

        // Filter out the deleted contact from the users array
        const filteredItems = users.filter((item) => item.id !== userId);

        // Update the users array and the index of the last deleted contact
        this.setState({
            users: filteredItems,
            lastDeletedIndex: userId - 1,
        });
    };

    render() {
        const { users, showAddform } = this.state;
        console.log(users);
        return (
            <>
                <Container>
                    <Row>
                        {" "}
                        <Header />
                    </Row>

                    {/* Button to toggle the display of the contact form */}
                    <Row className="d-grid gap-2 mb-3">
                        <Button
                            variant="success"
                            size="lg"
                            onClick={() => this.toggleAddForm(!showAddform)}
                        >
                            Show / Hide Contact Form
                        </Button>
                    </Row>

                    {/* Contact form */}
                    <Row className="mb-3">
                        {showAddform ? (
                            <ContactForm formSubmit={this.handleformSubmit} />
                        ) : null}
                    </Row>

                    <Row className="d-flex justify-content-center">
                        {users.map((user) => (
                            <Col>
                                <CardGroup>
                                    <Contact
                                        key={user}
                                        user={user}
                                        deleteContact={this.handleDeleteContact}
                                        editContact={this.handleUpdateContact}
                                    />
                                </CardGroup>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </>
        );
    }
}
export default ContactList;