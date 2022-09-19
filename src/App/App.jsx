import React, { useEffect, useState } from "react";
import './App.css';
import EditMenu from "../EditMenu.jsx";
import AlarmList from "../alarmList/alarmList.jsx";



function App() {
  const [ alarmView, setView ] = useState(0);
  const [ schedule, setSchedule ] = useState(null);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [error, setError ] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/schedule`,
    {
      method: "GET",
      headers: {
        Accepts: "application/json"
      },
      cache: "default"
    }
    )
    .then((res) => res.json())
    .then(
      (data) => {
      // setSchedule();
      setIsLoaded(true);
      setSchedule(data.events)
    },
    (error) => {
      setIsLoaded(true);
      setError(error);
    }
    );
  }, []);

if (error) {
  return <h1>error: {error.message}</h1>;
} else if (!isLoaded) {
  return <h1>Loading...</h1>;
} else {
  return (
    <React.Fragment>
       <AlarmList obj={schedule} viewState={[alarmView, setView]} /> 
       <EditMenu view={alarmView} /> 
    </React.Fragment>
  );
}

}


export default App;
