
import React from "react";
import { getFunName } from "../helpers";



class StorePicker extends React.Component {

	myInput = React.createRef();

   goToStore = event => {
		//stop form from submitting
		event.preventDefault();

		//get text from input
		let storeName = this.myInput.current.value

		//change the page to /store/user input

		this.props.history.push(`/store/${storeName}`);
	}

	render() {
		return (

			<form className='store-selector' onSubmit={this.goToStore}>
				<h2> Please Enter a Store </h2>
				<input type="text"
						 ref={this.myInput}
						 required
						 placeholder="Store Name"
						 defaultValue={getFunName()}
				/>
				<button type='submit'>Visit Store</button>

			</form>

		)
	}
}

export default StorePicker