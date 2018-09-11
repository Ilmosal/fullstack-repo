import React from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
	const maara = () => props.huono+props.neutraali + props.hyva
	const keskiarvo = () => maara() != 0 ? ((-1*props.huono+props.hyva)/(maara())).toFixed(2) : 0
	const positiivisia = () => maara() != 0 ? (100*(props.hyva)/maara()).toFixed(1) : 0
	if (maara() == 0) {
		return (
		<div>
		<h1>Statistiikka</h1>
		<div>
			<p>Ei statistiikkaa tiedolla</p>
		</div>
		</div>
		)
	}
	return (
		<div>
		<h1>Statistiikka</h1>
		<div>
			<Statistic name="Hyvä" number={props.hyva}/>	
			<Statistic name="Neutraali" number={props.neutraali}/>
			<Statistic name="Huono" number={props.huono}/>
			<Statistic name="Keskiarvo" number={keskiarvo()}/>
			<Statistic name="Positiivisia" number={positiivisia()}/>
		</div>
		</div>
	)
}

const Statistic = (props) => {
	return (
		<p>{props.name} {props.number}</p>
	)
}

const Button = (props) => {
	return (
		<button onClick={props.action}>{props.nimi}</button>
	)
}

class App extends React.Component {
	constructor() {
		super()
		this.state = {
			hyva: 0,
			neutraali: 0,
			huono: 0
		}
	}

	render() {

		return (
			<div>
			<div>
			<h1>Anna Palautetta</h1>
			<Button nimi='hyva' action={() => this.setState({hyva: this.state.hyva + 1})}/>
			<Button nimi='neutraali' action={() => this.setState({neutraali: this.state.neutraali + 1})}/>
			<Button nimi='huono' action={() => this.setState({huono: this.state.huono + 1})}/>
			</div>
			<Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} huono={this.state.huono}/>
			</div>
		)
	}
}

ReactDOM.render(
	  <App />,
	  document.getElementById('root')
)
