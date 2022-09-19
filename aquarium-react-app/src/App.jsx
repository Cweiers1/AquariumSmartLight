import React, { useState } from "react";
import './App.css';
import EditMenu from "./EditMenu.jsx";
import AlarmList from "./alarmList.jsx";



async function App() {
  const [alarmView, setView] = useState(0);

  let schedule = (function() {
    fetch(`http://localhost:3000/schedule`)
    .then((res) => res.json())
    .then((data) => {
 
    });
  })
  

     console.log(schedule())
  
  

    // console.log(schedule)
   
    return (
      <React.Fragment>
        <AlarmList viewState={[ alarmView, setView ]} />
        <EditMenu view={alarmView} />
      </React.Fragment>
    );

}


export default App;
