
import React from 'react';
import { callApi, errorResponse, getSession } from '../main';
import './contactsupport.css';

class ContactSupport extends React.Component {
    constructor() {
        super();
        this.sid = getSession("sid");
        if (this.sid === "") {
            window.location.replace("/");
        }
    }

    render() {
        return (
            <div className='full-height contact-support-container'>
                <div className='cpcontent'>
                    <h3>How to Contact Us?</h3>
                    <p>
                        Thank you for reaching out to Forecast Flair! If you have any questions, concerns, or feedback, feel free to contact our support team.
                    </p>
                    <p>
                        You can reach us via email at <a href="mailto:support@forecastflair.com">support@forecastflair.com</a>. Our dedicated support team is committed to responding to your inquiries as quickly as possible.
                    </p>
                    <div className="additional-info">
                        <h4>Additional Information:</h4>
                        <ul>
                            <li>Our support team operates from Monday to Friday, 9 AM to 5 PM .</li>
                            <li>Please include your {this.sid && "session ID"} in your email for faster assistance.</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactSupport;
