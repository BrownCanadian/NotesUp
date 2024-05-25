import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/*"
					element={
						<div className="App">
							<Login />
						</div>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
