import React from 'react'; 
import { getSession } from '../main'; 
import './help.css'; 
 
class Help extends React.Component { 
    constructor() { 
        super(); 
        this.sid = getSession("sid"); 
    } 
 
    render() { 
        return ( 
            <div className='popup-container'> 
                <div className='popup-content'> 
                    <h3>Welcome to ForecastFlair!</h3> 
                    <p> 
                        Start by downloading and installing the app, and customize it based on your preferences. Explore features like current weather updates, forecasts, and radar information. Easily manage your locations and set up personalized notifications for weather alerts. If you encounter any issues, find quick solutions in the troubleshooting section. Rest assured, your privacy is important to us, and you can manage subscriptions for additional features. Need help or want to give feedback? Contact our support team. Stay informed with regular app updates and be sure to check our terms of service and privacy policy. Enjoy the simplicity and accuracy of our weather app! 
                    </p> 
                    <div className="faq-section"> 
                        <h4>Frequently Asked Questions : </h4> 
                        <ul> 
                            <li> 
                                <strong>How can I change my default location in the app?</strong> 
                                <p>Navigate to settings and look for the option to add or change your default location.</p> 
                            </li> 
                            <li> 
                                <strong>What does the humidity percentage mean in the forecast?</strong> 
                                <p>Humidity percentage indicates the amount of moisture in the air. Higher percentages mean more moisture.</p> 
                            </li> 
                            <li> 
                                <strong>How often is the weather information updated?</strong> 
                                <p>Check the app settings for details on how frequently the weather data is updated.</p> 
                            </li> 
                            <li> 
                                <strong>Can I receive severe weather alerts on the app?</strong> 
                                <p>Yes, enable alerts in the app settings to receive notifications for severe weather conditions.</p> 
                            </li> 
                            <li> 
                                <strong>How do I report inaccuracies in the weather data?</strong> 
                                <p>Look for a "Report" option within the app to inform developers of any inaccuracies.</p> 
                            </li> 
                        </ul> 
                    </div> 
                     
                </div> 
            </div> 
        ); 
    } 
} 
 
export default Help;