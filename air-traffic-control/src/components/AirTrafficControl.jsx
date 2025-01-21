import { useState } from "react";
 
const AirTrafficControl = () => {
  const [flights, setFlights] = useState([
    { name: "AA101", runwayTime: 3, maxLateness: 5 },
    { name: "BA202", runwayTime: 2, maxLateness: 6 },
    { name: "CA303", runwayTime: 1, maxLateness: 8 },
    { name: "DA404", runwayTime: 4, maxLateness: 7 },
    { name: "EA505", runwayTime: 2, maxLateness: 6 },
    { name: "FA606", runwayTime: 3, maxLateness: 9 },
    { name: "GA707", runwayTime: 1, maxLateness: 10 },
    { name: "HA808", runwayTime: 2, maxLateness: 11 },
    { name: "IA909", runwayTime: 1, maxLateness: 12 },
    { name: "JA1010", runwayTime: 3, maxLateness: 13 },
  ]);
  const [flightName, setFlightName] = useState("");
  const [runwayTime, setRunwayTime] = useState("");
  const [maxIndividualLateness, setMaxIndividualLateness] = useState("");
  const [runways, setRunways] = useState(1);
  const [result, setResult] = useState(null);
 
  const addFlight = () => {
    if (flightName && runwayTime && maxIndividualLateness) {
      setFlights([
        ...flights,
        {
          name: flightName,
          runwayTime: parseInt(runwayTime),
          maxLateness: parseInt(maxIndividualLateness),
        },
      ]);
      setFlightName("");
      setRunwayTime("");
      setMaxIndividualLateness("");
    }
  };
 
  const minimizeDelays = () => {
    // Ordenar os voos por tempo máximo de atraso permitido
    const sortedFlights = [...flights].sort((a, b) => a.maxLateness - b.maxLateness);
 
    const runwayEndTimes = Array(runways).fill(0); // Tempos disponíveis das pistas
    const scheduledFlights = [];
    let maxDelay = 0;
 
    sortedFlights.forEach((flight) => {
      // Encontra a pista disponível mais cedo
      const earliestRunwayIndex = runwayEndTimes.indexOf(Math.min(...runwayEndTimes));
      const startTime = Math.max(runwayEndTimes[earliestRunwayIndex], 0);
      const endTime = startTime + flight.runwayTime;
 
      // Atualiza o estado da pista e calcula o atraso
      runwayEndTimes[earliestRunwayIndex] = endTime;
      const delay = Math.max(0, endTime - flight.maxLateness);
 
      maxDelay = Math.max(maxDelay, delay);
      scheduledFlights.push({
        ...flight,
        startTime,
        endTime,
        delay,
        runway: earliestRunwayIndex + 1, // Identificação da pista
      });
    });
 
    setResult({ scheduledFlights, maxDelay });
  };
 
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Air Traffic Control</h1>
      <div style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>
        <label>Number of Runways: </label>
        <input
          type="number"
          value={runways}
          onChange={(e) => setRunways(parseInt(e.target.value))}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={minimizeDelays} style={{ marginLeft: "20px" }}>
          Simulate
        </button>
      </div>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Flight Name"
          value={flightName}
          onChange={(e) => setFlightName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Runway Time"
          value={runwayTime}
          onChange={(e) => setRunwayTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Lateness"
          value={maxIndividualLateness}
          onChange={(e) => setMaxIndividualLateness(e.target.value)}
        />
        <button onClick={addFlight} style={{ marginLeft: '20px' }}>Add Flight</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Flights</h2>
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Runway Time</th>
              <th>Max Lateness</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={index}>
                <td>{flight.name}</td>
                <td>{flight.runwayTime}</td>
                <td>{flight.maxLateness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Scheduled Flights</h2>
          <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Runway Time</th>
                <th>Runway</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Max Lateness</th>
                <th>Delay</th>
              </tr>
            </thead>
            <tbody>
              {result.scheduledFlights.map((flight, index) => (
                <tr key={index}>
                  <td>{flight.name}</td>
                  <td>{flight.runwayTime}</td>
                  <td>{flight.runway}</td>
                  <td>{flight.startTime}</td>
                  <td>{flight.endTime}</td>
                  <td>{flight.maxLateness}</td>
                  <td>{flight.delay}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 style={{ marginTop: "20px" }}>Max Delay: {result.maxDelay}</h3>
        </div>
      )}
    </div>
  );
};
 
export default AirTrafficControl;
