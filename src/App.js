import React, { useEffect, useState } from "react";
import Calendar from "./components/calendar/Calendar";
import NewData from "./components/submitData/NewData";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeviceConnect from "./components/device/DeviceConnect";
import Header from "./components/ui/Header";
import AboutDevice from "./components/device/AboutDevice";
import Footer from "./components/ui/Footer";

export default function App() {
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [newDataAvailable, setNewDataAvailable] = useState(true);
  const [newRequest] = useState(false);
  // const [newRequest, setNewRequest] = useState(false);
  const [data, setData] = useState('');

  useEffect(() => {
    if(data) {
      setDeviceConnected(true);
    } else if(data.slice(1)) {
      setNewDataAvailable(true);
    }
  }, [data]);
  
  async function connectSerial() {
    if ("serial" in navigator) {
      try {
        const port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        const reader = port.readable.getReader();
        const readData = async () => {
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              reader.releaseLock();
              break;
            }
            // Assuming value is a TextDecoder stream
            setData(prevData => prevData + new TextDecoder().decode(value));
          }
        };
        const writer = port.writable.getWriter();
        const connection = new TextEncoder().encode("S");
        await writer.write(connection);
        writer.releaseLock();
        readData();
      } catch (err) {
        console.error('There was an error opening the serial port:', err);
      }
    }
  }

  return(
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={
            <React.Fragment>
              <DeviceConnect onDeviceConnected={deviceConnected} onConnectSerial={connectSerial} />
              {data && data !== 'S' && <p>{data}</p>}
              <p>{data}</p>
            </React.Fragment>
          } />
          <Route path="/myrecords" element={
            <React.Fragment>
              <Header deviceConnected={deviceConnected} newDataAvailable={newDataAvailable} newRequest={newRequest} />
              <div className="w-full flex justify-start px-10 gap-10 mt-5 mb-10">
                <AboutDevice />
                <Calendar />
              </div>
            </React.Fragment>
          } />
          <Route path="/addData" element={
            <React.Fragment>
              <Header deviceConnected={deviceConnected} newRequest={newRequest} />
              <div className="w-full flex justify-start px-10 gap-10 mt-5 mb-10">
                <AboutDevice />
                <NewData data={data} />
              </div>
            </React.Fragment>
          } />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}