import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import Sidebar from "./components/Sidebar";
import { Route } from "react-router";
function App() {
	return (
		<div>
			<Route path="/dashboard" component={Dashboard} />
		</div>
	);
}

export default App;
