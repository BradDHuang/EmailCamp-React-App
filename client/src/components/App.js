import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

// const Header = () => <h2>Header</h2>;
import Header from './Header';
// const Landing = () => <h2>Landing</h2>;
import Landing from './Landing';
// const Dashboard = () => <h2>Dashboard</h2>;
import Dashboard from './Dashboard';
// const SurveyNew = () => <h2>SurveyNew</h2>;
import SurveyNew from './surveys/SurveyNew';

// const App = () => {
class App extends Component {
	componentDidMount() {
		// lifecycle method.
		this.props.fetchUser();
	}
	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

// export default App;
export default connect(null, actions)(App);
