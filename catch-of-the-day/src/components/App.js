import React, {Fragment, Component} from 'react';
import Header from '../components/Header';
import Order from '../components/Order';
import Inventory from '../components/Inventory';
import sampleFishes from "../sample-fishes";
import Fish from './Fish';
import base from "../base";


class App extends Component {

	componentDidMount() {
		const { params } = this.props.match;
		this.ref = base.syncState(`${params.storeId}/fishes`, {
			context: this,
			state: "fishes"
		});
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);

	}

	//methods that update state and the actual state always need to live in the actual component
	state = {
		fishes: {},
		order: {}
	};

	addFish = fish => {
		//take a copy of the existing state
		const fishes = { ...this.state.fishes };


		//add new fish to that fishes variable
		fishes[`fish${Date.now()}`] = fish;

		//set the new fishes object to state
		this.setState({
			fishes: fishes
		});
	};

	addToOrder = key => {
		// take a copy of state

		const order = {...this.state.order};

		//add to order or update the number in our order
		order[key] = order[key] + 1|| 1;

		//call set state to update state object
		this.setState({ order });
	};

	loadSampleFishes = () => {
		this.setState({fishes: sampleFishes})
	};



	render() {
		return (<Fragment>
				<div className="catch-of-the-day">

					<div className="menu">

						<Header tagline="Fresh Seafood Market"/>
						<ul className="fishes">
							{Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]}/>)}
						</ul>
					</div>
						<Order
						fishes={this.state.fishes}
						order={this.state.order}
						/>
						<Inventory
							addFish={this.addFish}
							loadSampleFishes={this.loadSampleFishes}
						/>


					</div>



			</Fragment>
		)
	}

}

export default App