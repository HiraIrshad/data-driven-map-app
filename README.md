**# Interactive Data-Driven Map Web Application**

**## Project Overview**

This is a React-based web application that allows users to input and visualize geographical data on an interactive map. Users can upload location data via **CSV** or **JSON** files or manually input city information along with coordinates and a numeric value (such as population). The data can then be **filtered**, **searched**, **sorted**, and displayed using **markers on a Leaflet map**. Markers are **color-coded** based on the numeric value, and a **legend** is displayed for better interpretation.

**### Key Features**

* Upload data in **CSV** or **JSON** formats
* Manually add new location data
* Filter data based on a **numerical threshold**
* Search cities by name
* Sort data by **city name** or **value** (ascending/descending)
* Display data as markers on an interactive **Leaflet map**
* **Color-coded markers** with a **map legend**
* **Responsive** and **visually appealing** UI

---

**## Setup and Run Instructions**

### Prerequisites

* Node.js (v14 or above)
* npm or yarn

### Steps to Run Locally

1. **Clone the Repository**

```bash
https://github.com/HiraIrshad/data-driven-map-app.git
cd data-driven-map-app
```

2. **Install Dependencies**

```bash
npm install
```

*or if you're using yarn:*

```bash
yarn install
```

3. **Start the Development Server**

```bash
npm start
```

*or*

```bash
yarn start
```

4. **Open in Browser**

Navigate to `http://localhost:3000` to view the app.

### Optional

To build the app for production:

```bash
npm run build
```

---

**## Technologies Used**

### Frontend

* **React**: JavaScript library for building UI components and managing application state
* **React Leaflet**: Wrapper around Leaflet for rendering interactive maps in React
* **Leaflet**: JavaScript library for displaying maps and location markers
* **PapaParse**: Library for parsing CSV files into usable JavaScript objects
* **HTML5 & CSS3**: Used for layout, design, and responsive structure
* **JavaScript (ES6+)**: Core programming language used in the app logic

### Styling

* Responsive layout using **Flexbox**
* Custom **color-coded markers** and **map legends** for better data interpretation

### Backend

* **None required** – This project is 100% frontend and client-side

---

**## Folder Structure**

```
public/
  index.html
src/
  App.js         # Main app logic
  App.css        # Styling
  index.js       # React entry point
  assets/        # (optional) icons or images
```

---

**## Approach**

The application is built with a **frontend-only architecture**, focusing entirely on **client-side functionality**. The workflow is designed to maximize interactivity and usability **without a backend**.

### Data Input Handling

* Users can upload `.csv` or `.json` files with `city`, `lat`, `lng`, and `value` fields
* Manual entry via a form is also supported

### Data Processing

* Uploaded/entered data is parsed and validated using **PapaParse** and `JSON.parse`
* Filtering via `Array.filter`, searching via `String.includes`, sorting via `Array.sort`

### Data Visualization

* Data is visualized with **Leaflet markers** using React Leaflet
* Markers are **color-coded** based on value range (e.g., red = high, green = low)
* Clicking a marker shows a **popup** with city name and value
* A **dynamic legend** explains marker colors

### UI and UX

* Fully responsive layout for mobile and desktop
* User-friendly controls for uploading, filtering, sorting, and searching
* Additional **data table** for textual reference of the dataset

This design delivers a fast, interactive, and intuitive experience for geographic data visualization.

---

**## Example Usage**

### Uploading Data

Click the **"Choose File"** button and upload a `.csv` or `.json` file.

Your file should contain at least the following fields: `city`, `lat`, `lng`, and `value`.

#### Example JSON Format:

```json
[
  { "city": "Lahore", "lat": 31.5497, "lng": 74.3436, "value": 11000000 },
  { "city": "Karachi", "lat": 24.8607, "lng": 67.0011, "value": 14000000 },
  { "city": "Islamabad", "lat": 33.6844, "lng": 73.0479, "value": 1000000 }
]
```

#### Example CSV Format:

```
city,lat,lng,value
Lahore,31.5497,74.3436,11000000
Karachi,24.8607,67.0011,14000000
Islamabad,33.6844,73.0479,1000000
```

### Manual Entry

Use the form inputs to enter:

* **City Name**
* **Latitude**
* **Longitude**
* **Value**

Click the **"Add"** button to include the data point.

### Filtering, Searching, Sorting

* **Filter**: Show only cities where value is above a threshold
* **Search**: Find cities by name
* **Sort**: Use dropdowns to sort by **city name** or **value** (ascending/descending)

### Interacting with the Map

* Markers will appear on the map for each city
* Click a marker to see city name and value
* Refer to the **legend** on the top right of the map to understand the color scheme:

  * Red = High Value
  * Orange = Medium Value
  * Green = Low Value
  * Sample cities.json and pak-cities.csv files are present in the main repository.

