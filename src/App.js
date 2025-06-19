import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Papa from 'papaparse';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const defaultCenter = [30.3753, 69.3451];
const defaultZoom = 5;

function getMarkerClass(value) {
  if (value > 10000000) return 'marker-red';
  if (value > 5000000) return 'marker-orange';
  return 'marker-green';
}

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      const reader = new FileReader();

      reader.onload = (event) => {
        const content = event.target.result;

        if (fileType === 'csv') {
          Papa.parse(content, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
              const cleaned = results.data.map(d => ({
                city: d.city,
                lat: parseFloat(d.lat),
                lng: parseFloat(d.lng),
                value: parseFloat(d.value)
              })).filter(d => !isNaN(d.lat) && !isNaN(d.lng) && !isNaN(d.value));
              setData(cleaned);
            }
          });
        } else if (fileType === 'json') {
          try {
            const json = JSON.parse(content);
            const cleaned = json.map(d => ({
              city: d.city,
              lat: parseFloat(d.lat),
              lng: parseFloat(d.lng),
              value: parseFloat(d.value)
            })).filter(d => !isNaN(d.lat) && !isNaN(d.lng) && !isNaN(d.value));
            setData(cleaned);
          } catch (err) {
            alert('Invalid JSON format');
          }
        } else {
          alert('Unsupported file format. Please upload a CSV or JSON file.');
        }
      };

      reader.readAsText(file);
    }
  };

  const handleManualInput = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEntry = {
      city: form.city.value,
      lat: parseFloat(form.lat.value),
      lng: parseFloat(form.lng.value),
      value: parseFloat(form.value.value),
    };
    setData([...data, newEntry]);
    form.reset();
  };

  const filteredData = data
    .filter((d) => (!filter || d.value > parseFloat(filter)) &&
      (!search || d.city.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (!sortKey) return 0;
      if (sortKey === 'city') {
        return sortOrder === 'asc'
          ? a.city.localeCompare(b.city)
          : b.city.localeCompare(a.city);
      } else if (sortKey === 'value') {
        return sortOrder === 'asc'
          ? a.value - b.value
          : b.value - a.value;
      }
      return 0;
    });

  return (
    <div className="app-container">
      <h1 className="main-title">🌍 Interactive Data-Driven Map</h1>

      <div className="controls">
        <input type="file" accept=".csv, .json" onChange={handleFileUpload} className="upload-input" />

        <form onSubmit={handleManualInput} className="form-inputs">
          <input name="city" placeholder="City" required />
          <input name="lat" placeholder="Latitude" type="number" step="any" required />
          <input name="lng" placeholder="Longitude" type="number" step="any" required />
          <input name="value" placeholder="Value" type="number" step="any" required />
          <button type="submit">Add</button>
        </form>

        <div className="filter-sort">
          <input
            type="number"
            placeholder="Filter value >"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <option value="">Sort by...</option>
            <option value="city">City Name</option>
            <option value="value">Value</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer center={defaultCenter} zoom={defaultZoom} className="map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredData.map((point, idx) => (
            <Marker
              key={idx}
              position={[point.lat, point.lng]}
              icon={L.divIcon({
                className: '',
                html: `<div class="marker ${getMarkerClass(point.value)}"></div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
              })}
            >
              <Popup>
                <strong>{point.city}</strong><br />
                Value: {point.value.toLocaleString()}
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="map-legend">
          <h3>Legend</h3>
          <div><span className="marker marker-red"></span> Value &gt; 10,000,000</div>
          <div><span className="marker marker-orange"></span> Value 5,000,001 – 10,000,000</div>
          <div><span className="marker marker-green"></span> Value ≤ 5,000,000</div>
        </div>
      </div>

      <div className="table-section">
        <h2>City Data</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((d, idx) => (
              <tr key={idx}>
                <td>{d.city}</td>
                <td>{d.lat}</td>
                <td>{d.lng}</td>
                <td>{d.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

