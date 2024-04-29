import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Home from './home';
import ChangePassword from './components/changepassword';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CurrentConditions from './components/currentconditions';
import HourlyForecast from './components/hourlyforecast';
import DailyForecast from './components/dailyforecast';
import ProvideFeedback from './components/providefeedback';
import ContactSupport from './components/contactsupport';
import MyProfile from './components/myprofile';
import ReportAnIssue from './components/reportanissue';
import Help from './components/help';
import WeeklyOutlook from './components/weeklyoutlook';
import AddAPlace from './components/addaplace';



function Website(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path='/home' element={<Home/>} />
        <Route path='/changepassword' element={<ChangePassword/>} />
        <Route path='/currentconditions' element={<CurrentConditions/>} />
        <Route path='/hourlyforecast' element={<HourlyForecast/>} />
        <Route path='/dailyforecast' element={<DailyForecast/>} />
        <Route path='/weeklyoutlook' element={<WeeklyOutlook/>} />
        <Route path='/providefeedback' element={<ProvideFeedback/>} />
        <Route path='/contactsupport' element={<ContactSupport/>} />
        <Route path='/myprofile' element={<MyProfile/>} />
        <Route path='/reportanissue' element={<ReportAnIssue/>} />
        <Route path='/help' element={<Help/>} />
        <Route path='/addaplace' element={<AddAPlace/>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Website/>, document.getElementById('root'));