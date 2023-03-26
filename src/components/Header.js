import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";

class Header extends Component {
    render() {
        return (
            <div className="bg-primary py-3">
                <div className=" text-center">
                    <FontAwesomeIcon icon={faAddressBook} size="3x" className="text-light mb-3" />
                    <h1 className="text-light mb-0">CONTACT LIST MANAGER</h1>
                </div>
            </div>
        );
    }
}

export default Header;

