import React, { Component } from 'react'
import PeopleService from '../services/people-service'

const NO = 0
const YES = 1
const ALL = 3

const LOW_WEIGHT = 69
//const IDEAL_WEIGHT = > 70 < 89
const HIGH_WEIGHT = 90

const SHORT_HEIGHT = 1.59
//const MEDIAN_HEIGHT = > 1.60 < 1.79
const TALL_HEIGHT = 1.80

export default class ShowPeoplePage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            people: [],
            allPeople: [],
            lowWeightChecked: true,
            idealWeightChecked: true,
            highWeightChecked: true,
            shortHeightChecked: true,
            medianHeightChecked: true,
            tallHeightChecked: true,
            lactoseChecked: ALL,
            atheleteChecked: ALL
        }
    }

    async componentDidMount() {
        try {
            const { data } = await PeopleService.findAll()
            this.setState({ people: data })
            this.setState({ allPeople: data })
        } catch (e) {
            console.log(e)
        }

        var modal = document.getElementById("myModal");
        var btn = document.getElementById("myBtn");

        btn.onclick = function() {
            modal.style.display = "block";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    filterByAthelete = (people, condition) => {
        return people.filter(person => person.athlete == condition)
    }

    filterByLactose = (people, condition) => {
        return people.filter(person => person.lactose == condition)
    }

    filterByLowWeight = (people, condition) => {
        return people.filter(person => !(person.weight <= LOW_WEIGHT))
    }

    filterByIdealWeight = (people, condition) => {
        return people.filter(person => !(person.weight > LOW_WEIGHT && person.weight < HIGH_WEIGHT))
    }

    filterByHighWeight = (people, condition) => {
        return people.filter(person => !(person.weight >= HIGH_WEIGHT))
    }

    filterByShortHeight = (people, condition) => {
        return people.filter(person => !(person.height <= SHORT_HEIGHT))
    }

    filterByMedianHeight = (people, condition) => {
        return people.filter(person => !(person.height > SHORT_HEIGHT && person.height < TALL_HEIGHT))
    }

    filterByTallHeight = (people, condition) => {
        return people.filter(person => !(person.height >= TALL_HEIGHT))
    }

    onChangeLactoseCheckbox = (option) => {
        this.setState({ lactoseChecked: option })
    }

    onChangeAtheleteCheckbox = (option) => {
        this.setState({ atheleteChecked: option })
    }

    onFilter = () => {
        let people = this.state.allPeople

        const lactose = this.state.lactoseChecked
        if (lactose === NO) {
            people = this.filterByLactose(people, false)
        }
        else if (lactose === YES) {
            people = this.filterByLactose(people, true)
        }

        const athelete = this.state.atheleteChecked
        if (athelete === NO) {
            people = this.filterByAthelete(people, false)
        }
        else if (athelete === YES) {
            people = this.filterByAthelete(people, true)
        }

        const lowWeight = this.state.lowWeightChecked
        const idealWeight = this.state.idealWeightChecked
        const highWeight = this.state.highWeightChecked
    
        if (!lowWeight) {
            people = this.filterByLowWeight(people, false)
        }
        if (!idealWeight) {
            people = this.filterByIdealWeight(people, false)
        }
        if (!highWeight) {
            people = this.filterByHighWeight(people, false)
        }

        const shortHeight = this.state.shortHeightChecked
        const medianHeight = this.state.medianHeightChecked
        const tallHeight = this.state.tallHeightChecked

        if (!shortHeight) {
            people = this.filterByShortHeight(people, false)
        }
        if (!medianHeight) {
            people = this.filterByMedianHeight(people, false)
        }
        if (!tallHeight) {
            people = this.filterByTallHeight(people, false)
        }

        this.setState({ people: people })
    }

    render() {
        return (
            <div>
                <div className="table-bar">
                    <span className="filter-icon" id="myBtn">
                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-filter" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="currentColor" strokeWidth="1" fillRule="evenodd" d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </span>                    
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div>
                                <fieldset>
                                    <legend>Peso</legend>
                                    <div className="box">
                                        <input type="checkbox" checked={this.state.lowWeightChecked} onChange={e => this.setState({ lowWeightChecked: !this.state.lowWeightChecked })}/>
                                        <label htmlFor="">Abaixo</label>
                                        <input type="checkbox" checked={this.state.idealWeightChecked} onChange={e => this.setState({ idealWeight: !this.state.idealWeightChecked })}/>
                                        <label htmlFor="">Ideal</label>
                                        <input type="checkbox" checked={this.state.highWeightChecked} onChange={e => this.setState({ highWeight: !this.state.highWeightChecked })}/>
                                        <label htmlFor="">Acima</label>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Altura</legend>
                                    <div className="box">
                                        <input type="checkbox" checked={this.state.shortHeightChecked} onChange={e => this.setState({ shortHeightChecked: !this.state.shortHeightChecked })}/>
                                        <label htmlFor="">Baixa</label>
                                        <input type="checkbox" checked={this.state.medianHeightChecked} onChange={e => this.setState({ medianHeightChecked: !this.state.medianHeightChecked })}/>
                                        <label htmlFor="">Mediana</label>
                                        <input type="checkbox" checked={this.state.tallHeightChecked} onChange={e => this.setState({ tallHeight: !this.state.tallHeightChecked })}/>
                                        <label htmlFor="">Alta</label>
                                    </div>
                                </fieldset>
                                <div>
                                    <fieldset>
                                        <legend>Intolerante a lactose</legend>
                                        <div className="lactose-checkbox box">
                                            <input type="checkbox" checked={this.state.lactoseChecked === ALL} onChange={e => this.onChangeLactoseCheckbox(ALL)}/>
                                            <label>Todos</label>
                                            <input type="checkbox" checked={this.state.lactoseChecked === YES} onChange={e => this.onChangeLactoseCheckbox(YES)}/>
                                            <label>Sim</label>
                                            <input type="checkbox" checked={this.state.lactoseChecked === NO} onChange={e => this.onChangeLactoseCheckbox(NO)}/>
                                            <label>Não</label>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Atleta</legend>
                                        <div className="box">
                                            <input type="checkbox" checked={this.state.atheleteChecked === ALL} onChange={e => this.onChangeAtheleteCheckbox(ALL)}/>
                                            <label>Todos</label>
                                            <input type="checkbox" checked={this.state.atheleteChecked === YES} onChange={e => this.onChangeAtheleteCheckbox(YES)}/>
                                            <label>Sim</label>
                                            <input type="checkbox" checked={this.state.atheleteChecked === NO} onChange={e => this.onChangeAtheleteCheckbox(NO)}/>
                                            <label>Não</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="modal-actions">
                                    <button className="primary-button" onClick={this.onFilter}>Salvar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="input-icon">
                        <i className="icon"><svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path  fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                            </svg>
                        </i> 
                        <input className="search-people-input" placeholder="Search"/>
                    </div>
                    <button className="add-customer-button">
                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-plus-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="currentColor" strokeWidth="1" fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path stroke="currentColor" strokeWidth="1" fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        <span>Adicionar</span>
                    </button>
                </div>
                <table className="people-table">
                    <thead>
                        <tr>
                            <th className="checkbox-header"><input type="checkbox"/></th>
                            <th className="person-name-header">NOME</th>
                            <th className="person-height-header">ALTURA</th>
                            <th>LACTOSE</th>
                            <th className="person-weight-header">PESO</th>
                            <th>ATLETA</th>
                            <th className="person-actions-header">
                                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                </svg>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map((person) => (
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td className="person-name">{person.name}</td>
                                <td className="person-height">{Number(person.height).toFixed(2)}</td>
                                <td className="person-lactose">
                                    {person.lactose ? <div className="status positive-status">SIM</div> : <div className="status negative-status">NÃO</div>}
                                </td>
                                <td className="person-weight">{Number(person.weight).toFixed(2)}</td>
                                <td className="person-athlete">
                                    {person.athlete? <div className="status positive-status">SIM</div> : <div className="status negative-status">NÃO</div>}
                                </td>
                                <td className="person-actions">
                                    <span>
                                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                        </svg>
                                    </span>
                                    <span>
                                        <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                                        </svg>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}