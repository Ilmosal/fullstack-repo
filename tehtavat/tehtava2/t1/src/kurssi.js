import React from 'react'

const Otsikko = (props) => {
	return (
		<h1>{props.kurssi.nimi}</h1>
	)
}

const Sisalto = (props) => {
	return (
		<div>
			<Osa osa={props.kurssi.osat[0]}/>
			<Osa osa={props.kurssi.osat[1]}/>
			<Osa osa={props.kurssi.osat[2]}/>
		</div>
	)
}

const Osa = (props) => {
	return (
		<p>{props.osa.nimi} {props.osa.tehtavia}</p>
	)
	
}

const Yhteensa = (props) => {
	return (
		<p>yhteensä {props.kurssi.osat[0].maara + props.kurssi.osat[1].maara + props.kurssi.osat[2].maara}</p>
	)
}

const Kurssi = (props) => {
	return(
		<div>
		<h1>{props.kurssi.nimi}</h1>
			{props.kurssi.osat.map(osa => <Osa osa={osa} />)}
			<p>Yhteensä {props.kurssi.osat.reduce(
				function(accumulator, osa) {
				return accumulator + osa.tehtavia
			}, 0)}</p>
		</div>
	)
}

export default Kurssi
