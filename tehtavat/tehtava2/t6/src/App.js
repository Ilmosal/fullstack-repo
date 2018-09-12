import React from 'react';
import axios from 'axios'
import personService from './services/persons'
import './index.css'

const Notification = ({message}) => {
	if (message == null) {
		return null
	}
	return (
		<div className="message">
			{message}
		</div>
	)
}

const FilterForm = (props) => {
	return (
		<div>
			rajaa näytettäviä: <input value={props.newFilter} onChange={props.filterChange} />
		</div>	
	)
}

const Person = (props) => {
	return (
		<p>{props.person.name} {props.person.number}</p>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props)
			this.state = {
				persons: [
					{ name: 'Arto Hellas',
					number: '090-123456'}
						],
				newName: '',
				newNumber: '',
				newFilter: '',
				message: null
			}
		}

	addPerson = (event) => {
		event.preventDefault()

		if (this.state.persons.map(per => per.name).includes(this.state.newName)) {
			this.setState({message: "Nimi " + this.state.newName + " on jo valmiiksi listassa!", newName:''})
			setTimeout(() => { this.setState({message:null})}, 4000)
		} else {
			personService
				.create({name:this.state.newName, number:this.state.newNumber})
				.then(response => {
					this.setState({persons:this.state.persons.concat(response.data),
							message:response.data.name + " lisätty!"})
				})
			this.setState({newName: '', newNumber: ''})
			setTimeout(() => {
				this.setState({message:null}) 
			}, 4000)
		}
	}

	componentDidMount() {
		personService
			.getAll()
			.then(response => {
				this.setState({persons:response.data})
				})
	}

	handleFilterChange = (event) => {
		this.setState({newFilter: event.target.value})
	}

	handlePersonChange = (event) => {
		this.setState({newName: event.target.value})
	}

	handleNumberChange = (event) => {
		this.setState({newNumber: event.target.value})
	}

	render() {
		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<Notification message={this.state.message}/>
				<FilterForm newFilter={this.state.newFilter} filterChange={this.handleFilterChange}/>
				<h3>Lisää Uusi</h3>
				<form onSubmit= {this.addPerson}>
				<div>
					nimi: <input value={this.state.newName} onChange={this.handlePersonChange}/>
				</div>
				<div>
					numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
				</div>
				<div>
					<button type="submit">lisää</button>
				</div>
				</form>
				<h2>Numerot</h2>
				{this.state.persons.filter(per => per.name.toLowerCase().includes(this.state.newFilter)).map(per => <Person person={per}/>)}
			</div>
		)
	}
}

export default App
