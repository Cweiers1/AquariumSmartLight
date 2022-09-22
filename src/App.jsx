import React, { useEffect, useState } from "react";
import EditMenu from "./EditMenu.jsx";
import AlarmList from "./alarmList.jsx";



function App() {
  const [alarmView, setView] = useState(0);
  const [pageView, setPage] = useState("schedule");
  const [schedule, setSchedule] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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
    switch (pageView) {
      case ("home"):

        break;
      case ("schedule"):
        return (
          <div className="grid grid-row-1 grid-cols-4 h-screen">
            <AlarmList obj={schedule} viewState={[alarmView, setView]} />
            <EditMenu view={alarmView} />
          </div>
        );
      default:
        setPage("home");
    }



  }

}


export default App;
