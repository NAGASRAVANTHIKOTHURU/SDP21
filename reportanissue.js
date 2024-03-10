import React, { useState } from 'react'; 
import './reportanissue.css'; 
import { callApi, errorResponse, getSession } from '../main'; 
 
const ReportAnIssue = () => { 
    const [issueDescription, setIssueDescription] = useState(''); 
    const [sessionID, setSessionID] = useState(getSession("sid")); 
 
    const handleSubmitIssue = async () => { 
        try { 
            if (!issueDescription) { 
                alert('Please enter the issue description.'); 
                return; 
            } 
 
            const url = 'http://localhost:5000/api/reportIssue'; 
            const data = JSON.stringify({ 
                issueDescription, 
                sessionID, 
            }); 
 
            const response = await callApi('POST', url, data, handleSuccess, handleError); 
        } catch (error) { 
            console.error('Error:', error); 
        } 
    }; 
 
    const handleSuccess = (res) => { 
        alert('Issue reported successfully!'); 
    }; 
 
    const handleError = (error) => { 
        console.error('Error reporting issue:', error); 
    }; 
 
    return ( 
        <div className='full-height report-issue-container'> 
            <div className='ricontent'> 
                <h3>Report an Issue</h3> 
                <p> 
                    If you encounter any issues or problems, please describe them below: 
                </p> 
                <div className="issue-form"> 
                    <label>Issue Description:</label> 
                    <textarea 
                        rows="4" 
                        cols="50" 
                        value={issueDescription} 
                        onChange={(e) => setIssueDescription(e.target.value)} 
                        placeholder="Type your issue description here..." 
                    ></textarea> 
                </div> 
                <button className='report-issue-button' onClick={handleSubmitIssue}> 
                    Submit Issue 
                </button> 
            </div> 
        </div> 
    ); 
}; 
 
export default ReportAnIssue;