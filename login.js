import React, { useState } from 'react';
import logo from './images/weatherlogo.png';
import { callApi, errorResponse, setSession } from './main';

const popupwindowstyle = { width: '300px', height: '450px', background: 'white' };
const logostyle = { width: '75px', height: '75px', position: 'absolute', left: '115px', top: '10px' };
const logodivstyle = { height: '100px' };
const space = { height: '10px' };

function Login() {
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  window.onload = function () {
    var login = document.getElementById('login');
    login.style.display = 'block';
  };

  function validate() {
    var T1 = document.getElementById('T1');
    var T2 = document.getElementById('T2');
    var url = 'http://localhost:5000/login/signin';
    var data = JSON.stringify({
      emailid: T1.value,
      pwd: T2.value,
    });

    callApi('POST', url, data, loginSuccess, errorResponse);
  }

  function loginSuccess(res) {
    var data = JSON.parse(res);
    if (data === 1) {
      var T1 = document.getElementById('T1');
      setSession('sid', T1.value, 0.5);
      window.location.replace('/home');
    } else alert('Invalid Credentials!');
  }

  function registration() {
    var T1 = document.getElementById('T1');
    var T2 = document.getElementById('T2');
    T1.value = '';
    T2.value = '';

    var reg = document.getElementById('registration');
    var login = document.getElementById('login');
    login.style.display = 'none';
    reg.style.display = 'block';
  }

  function register() {
    var RT1 = document.getElementById('RT1');
    var RT2 = document.getElementById('RT2');
    var RT3 = document.getElementById('RT3');
    var RT4 = document.getElementById('RT4');
    var RT5 = document.getElementById('RT5');
    var RT6 = document.getElementById('RT6');

    // Reset error messages
    RT1.style.border = '';
    RT2.style.border = '';
    RT3.style.border = '';
    RT4.style.border = '';
    RT5.style.border = '';
    RT6.style.border = '';
    setEmailError('');
    setPhoneNumberError('');
    setPasswordError('');

    if (RT1.value === '') {
      RT1.style.border = '1px solid red';
      RT1.focus();
      return;
    }
    if (RT2.value === '') {
      RT2.style.border = '1px solid red';
      RT2.focus();
      return;
    }
    if (RT3.value === '') {
      RT3.style.border = '1px solid red';
      RT3.focus();
      return;
    }
    if (RT4.value === '') {
      RT4.style.border = '1px solid red';
      RT4.focus();
      return;
    }
    if (RT5.value === '') {
      RT5.style.border = '1px solid red';
      RT5.focus();
      return;
    }
    if (RT6.value === '') {
      RT6.style.border = '1px solid red';
      RT6.focus();
      return;
    }
    if (RT5.value !== RT6.value) {
      alert('Password and Re-type Password must be the same');
      RT5.style.border = '1px solid red';
      RT5.focus();
      return;
    }
    if (!validateEmail(RT4.value)) {
      setEmailError('Please enter a valid email address ending with @gmail.com.');
      RT4.style.border = '1px solid red';
      RT4.focus();
      return;
    }
    if (!isPasswordComplex(RT5.value)) {
      setPasswordError('Password must have lowercase, uppercase, digit, and special character. Minimum 8 characters.');
      RT5.style.border = '1px solid red';
      RT5.focus();
      return;
    }
    if (!validatePhoneNumber(RT3.value)) {
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
      RT3.style.border = '1px solid red';
      RT3.focus();
      return;
    }

    var url = 'http://localhost:5000/registration/signup';
    var data = JSON.stringify({
      firstname: RT1.value,
      lastname: RT2.value,
      contactno: RT3.value,
      emailid: RT4.value,
      pwd: RT5.value,
    });
    callApi('POST', url, data, registeredSuccess, errorResponse);

    // Reset input fields
    RT1.value = '';
    RT2.value = '';
    RT3.value = '';
    RT4.value = '';
    RT5.value = '';
    RT6.value = '';

    var login = document.getElementById('login');
    var registration = document.getElementById('registration');
    registration.style.display = 'none';
    login.style.display = 'block';
  }

  function isPasswordComplex(password) {
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    return passwordRegex.test(password);
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    return emailRegex.test(email);
  }

  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  }

  function registeredSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
  }

  function forgotPassword() {
    var T1 = document.getElementById('T1');
    var T2 = document.getElementById('T2');
    T1.value = '';
    T2.value = '';

    var fgp = document.getElementById('forgotPassword');
    var login = document.getElementById('login');
    login.style.display = 'none';
    fgp.style.display = 'block';
  }

  function forgotPass() {
    var FT1 = document.getElementById('FT1');
    var FT2 = document.getElementById('FT2');
    var FT3 = document.getElementById('FT3');
    FT1.style.border = '';
    FT2.style.border = '';
    FT3.style.border = '';
    if (FT1.value === '') {
      FT1.style.border = '1px solid red';
      FT1.focus();
      return;
    }
    if (FT2.value === '') {
      FT2.style.border = '1px solid red';
      FT2.focus();
      return;
    }
    if (FT3.value === '') {
      FT3.style.border = '1px solid red';
      FT3.focus();
      return;
    }
    if (FT2.value !== FT3.value) {
      alert('New Password and Confirm Password must be the same');
      FT2.style.border = '1px solid red';
      FT2.focus();
      return;
    }

    var url = 'http://localhost:5000/forgotPassword/forgotPass';
    var data = JSON.stringify({
      UserName: FT1.value,
      newpassword: FT2.value,
      confirmpassword: FT3.value,
    });
    callApi('POST', url, data, PasswordSuccess, errorResponse);

    // Reset input fields
    FT1.value = '';
    FT2.value = '';
    FT3.value = '';

    var fgp = document.getElementById('forgotPassword');
    var login = document.getElementById('login');
    fgp.style.display = 'none';
    login.style.display = 'block';
  }

  function PasswordSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
  }

  return (
    <div className="full-height">
      <div id="header" className="loginheader">
        ForecastFlair
      </div>
      <div id="content" className="logincontent">
        <div id="login" className="popup">
          <div id="popupwindow" className="popupwindow" style={popupwindowstyle}>
            <div className="loginstyle1">Login</div>
            <div className="loginstyle2">
              <div style={logodivstyle}>
                <img src={logo} alt="" style={logostyle} />
              </div>
              <div>Username*</div>
              <div>
                <input
                  type="text"
                  id="T1"
                  className="txtbox"
                  onChange={() => setEmailError('')}
                />
              </div>
              <div style={space}></div>
              <div>Password*</div>
              <div>
                <input
                  type="password"
                  id="T2"
                  className="txtbox"
                  onChange={() => setPasswordError('')}
                />
              </div>
              <div style={space}></div>
              <div style={space}></div>
              <div>
                <button className="btn" onClick={validate}>
                  Sign In
                </button>
              </div>
              <div style={space}></div>
              <div style={space}></div>
              <div style={space}></div>
              <div>
                New user?{' '}
                <label className="linklabel" onClick={registration}>
                  Register here
                </label>
              </div>
              <div>
                <label className="linklabel" onClick={forgotPassword}>
                  Forgot Password?
                </label>
              </div>
            </div>
          </div>
        </div>
        <div id="registration" className="popup">
          <div id="registrationwindow" className="popupwindow" style={popupwindowstyle}>
            <div className="loginstyle1">New Registration</div>
            <div className="loginstyle2">
              <div>First Name*</div>
              <div>
                <input
                  type="text"
                  id="RT1"
                  className="txtbox"
                  onChange={() => setPhoneNumberError('')}
                />
              </div>
              <div style={space}></div>
              <div>Last Name*</div>
              <div>
                <input
                  type="text"
                  id="RT2"
                  className="txtbox"
                  onChange={() => setPhoneNumberError('')}
                />
              </div>
              <div style={space}></div>
              <div>Contact Number*</div>
              <div>
                <input
                  type="text"
                  id="RT3"
                  className="txtbox"
                  onChange={() => setPhoneNumberError('')}
                />
              </div>
              <div style={space}></div>
              <div>Email ID*</div>
              <div>
                <input
                  type="text"
                  id="RT4"
                  className="txtbox"
                  onChange={() => setEmailError('')}
                />
                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
              </div>
              <div style={space}></div>
              <div>Password*</div>
              <div>
                <input
                  type="password"
                  id="RT5"
                  className="txtbox"
                  onChange={() => setPasswordError('')}
                />
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
              </div>
              <div style={space}></div>
              <div>Re-type Password*</div>
              <div>
                <input
                  type="password"
                  id="RT6"
                  className="txtbox"
                  onChange={() => setPasswordError('')}
                />
              </div>
              <div style={space}></div>
              <div>
                <button className="btn" onClick={register}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="forgotPassword" className="popup">
          <div id="popupwindow" className="popupwindow" style={popupwindowstyle}>
            <div className="loginstyle1">ForgotPassword?</div>
            <div className="loginstyle2">
              <div>Username*</div>
              <div>
                <input type="text" id="FT1" className="txtbox" />
              </div>
              <div style={space}></div>
              <div>New Password*</div>
              <div>
                <input type="password" id="FT2" className="txtbox" />
              </div>
              <div style={space}></div>
              <div>Confirm Password*</div>
              <div>
                <input type="password" id="FT3" className="txtbox" />
              </div>
              <div style={space}></div>
              <div>
                <button className="btn" onClick={forgotPass}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="footer" className="loginfooter">
        Unleash the Weather, Beyond Measure!!
      </div>
    </div>
  );
}

export default Login;
