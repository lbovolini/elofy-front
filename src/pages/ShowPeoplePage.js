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
            filteredPeople: [],
            allPeople: [],
            lowWeightChecked: true,
            idealWeightChecked: true,
            highWeightChecked: true,
            shortHeightChecked: true,
            medianHeightChecked: true,
            tallHeightChecked: true,
            lactoseChecked: ALL,
            atheleteChecked: ALL,
            orderAscName: true,
            orderAscHeight: true,
            orderAscWeight: true
        }
    }

    async componentDidMount() {
        try {
            const { data } = await PeopleService.findAll()
            this.setState({ people: data })
            this.setState({ filteredPeople: data })
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

    filterByLowWeight = (people) => {
        return people.filter(person => !(person.weight <= LOW_WEIGHT))
    }

    filterByIdealWeight = (people) => {
        return people.filter(person => !(person.weight > LOW_WEIGHT && person.weight < HIGH_WEIGHT))
    }

    filterByHighWeight = (people) => {
        return people.filter(person => !(person.weight >= HIGH_WEIGHT))
    }

    filterByShortHeight = (people) => {
        return people.filter(person => !(person.height <= SHORT_HEIGHT))
    }

    filterByMedianHeight = (people) => {
        return people.filter(person => !(person.height > SHORT_HEIGHT && person.height < TALL_HEIGHT))
    }

    filterByTallHeight = (people) => {
        return people.filter(person => !(person.height >= TALL_HEIGHT))
    }

    onChangeLactoseCheckbox = (option) => {
        this.setState({ lactoseChecked: option })
    }

    onChangeAtheleteCheckbox = (option) => {
        this.setState({ atheleteChecked: option })
    }

    onChangeLowWeightCheckbox = () => {
        this.setState({ lowWeightChecked: !this.state.lowWeightChecked })
    }

    onChangeIdealWeightCheckbox = () => {
        this.setState({ idealWeightChecked: !this.state.idealWeightChecked })
    }

    onChangeHighWeightCheckbox = () => {
        this.setState({ highWeightChecked: !this.state.highWeightChecked })
    }

    onChangeShortHeightCheckbox = () => {
        this.setState({ shortHeightChecked: !this.state.shortHeightChecked })
    }

    onChangeMedianHeightCheckbox = () => {
        this.setState({ medianHeightChecked: !this.state.medianHeightChecked })
    }

    onChangeTallHeightCheckbox = () => {
        this.setState({ tallHeightChecked: !this.state.tallHeightChecked })
    }

    onChangeSearchInput = (e) => {
        const name = e.target.value

        if (!name || name === '') {
            this.setState({ people: this.state.filteredPeople })
            return
        }

        const people = this.state.people.filter(person => person.name.toLowerCase().match(name.toLowerCase()))

        this.setState({ people: people })
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
            people = this.filterByLowWeight(people)
        }
        if (!idealWeight) {
            people = this.filterByIdealWeight(people)
        }
        if (!highWeight) {
            people = this.filterByHighWeight(people)
        }

        const shortHeight = this.state.shortHeightChecked
        const medianHeight = this.state.medianHeightChecked
        const tallHeight = this.state.tallHeightChecked

        if (!shortHeight) {
            people = this.filterByShortHeight(people)
        }
        if (!medianHeight) {
            people = this.filterByMedianHeight(people)
        }
        if (!tallHeight) {
            people = this.filterByTallHeight(people)
        }

        this.setState({ people: people })
        this.setState({ filteredPeople: people })
    }

    clearPathStroke = () => {
        const iconPath = document.getElementsByClassName("icon-path")

        for (const path of iconPath) {
            path.style.stroke = "currentColor"
            path.style.strokeWidth = 1
        }
    }

    orderByName = () => {
        const people = this.state.people.sort((a, b) => {
            if (this.state.orderAscName) {
                return a.name.localeCompare(b.name)
            } else {
                return b.name.localeCompare(a.name)
            }
        })

        this.clearPathStroke()

        if (this.state.orderAscName) {
            const nameAscIcon = document.getElementsByClassName("name-asc-icon-path")[0]
            nameAscIcon.style.stroke = "#0A65FF"
            nameAscIcon.style.strokeWidth = 3
        } else {
            const nameDescIcon = document.getElementsByClassName("name-desc-icon-path")[0]
            nameDescIcon.style.stroke = "#0A65FF"
            nameDescIcon.style.strokeWidth = 3
        }

        this.setState({ orderAscName: !this.state.orderAscName })
        this.setState({ people: people })
    }

    orderByHeight = () => {
        const people = this.state.people.sort((a, b) => {
            if (this.state.orderAscHeight) {
                return a.height - b.height
            } else {
                return b.height - a.height
            }
        })

        this.clearPathStroke()

        if (this.state.orderAscHeight) {
            const heightAscIcon = document.getElementsByClassName("height-asc-icon-path")[0]
            heightAscIcon.style.stroke = "#0A65FF"
            heightAscIcon.style.strokeWidth = 3
        } else {
            const heightDescIcon = document.getElementsByClassName("height-desc-icon-path")[0]
            heightDescIcon.style.stroke = "#0A65FF"
            heightDescIcon.style.strokeWidth = 3
        }

        this.setState({ orderAscHeight: !this.state.orderAscHeight })
        this.setState({ people: people })
    }

    orderByWeight = () => {
        const people = this.state.people.sort((a, b) => {
            if (this.state.orderAscWeight) {
                return a.weight - b.weight
            } else {
                return b.weight - a.weight
            }
        })

        this.clearPathStroke()

        if (this.state.orderAscWeight) {
            const weightAscIcon = document.getElementsByClassName("weight-asc-icon-path")[0]
            weightAscIcon.style.stroke = "#0A65FF"
            weightAscIcon.style.strokeWidth = 3
        } else {
            const weightDescIcon = document.getElementsByClassName("weight-desc-icon-path")[0]
            weightDescIcon.style.stroke = "#0A65FF"
            weightDescIcon.style.strokeWidth = 3
        }

        this.setState({ orderAscWeight: !this.state.orderAscWeight })
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
                                        <input type="checkbox" checked={this.state.lowWeightChecked} onChange={this.onChangeLowWeightCheckbox}/>
                                        <label htmlFor="">Abaixo</label>
                                        <input type="checkbox" checked={this.state.idealWeightChecked} onChange={this.onChangeIdealWeightCheckbox}/>
                                        <label htmlFor="">Ideal</label>
                                        <input type="checkbox" checked={this.state.highWeightChecked} onChange={this.onChangeHighWeightCheckbox}/>
                                        <label htmlFor="">Acima</label>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Altura</legend>
                                    <div className="box">
                                        <input type="checkbox" checked={this.state.shortHeightChecked} onChange={this.onChangeShortHeightCheckbox}/>
                                        <label htmlFor="">Baixa</label>
                                        <input type="checkbox" checked={this.state.medianHeightChecked} onChange={this.onChangeMedianHeightCheckbox}/>
                                        <label htmlFor="">Mediana</label>
                                        <input type="checkbox" checked={this.state.tallHeightChecked} onChange={this.onChangeTallHeightCheckbox}/>
                                        <label htmlFor="">Alta</label>
                                    </div>
                                </fieldset>
                                <div>
                                    <fieldset>
                                        <legend>Intolerante a lactose</legend>
                                        <div className="lactose-checkbox box">
                                            <input type="checkbox" checked={this.state.lactoseChecked === ALL} onChange={this.onChangeLactoseCheckbox.bind(this, ALL)}/>
                                            <label>Todos</label>
                                            <input type="checkbox" checked={this.state.lactoseChecked === YES} onChange={this.onChangeLactoseCheckbox.bind(this, YES)}/>
                                            <label>Sim</label>
                                            <input type="checkbox" checked={this.state.lactoseChecked === NO} onChange={this.onChangeLactoseCheckbox.bind(this, NO)}/>
                                            <label>Não</label>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Atleta</legend>
                                        <div className="box">
                                            <input type="checkbox" checked={this.state.atheleteChecked === ALL} onChange={this.onChangeAtheleteCheckbox.bind(this, ALL)}/>
                                            <label>Todos</label>
                                            <input type="checkbox" checked={this.state.atheleteChecked === YES} onChange={this.onChangeAtheleteCheckbox.bind(this, YES)}/>
                                            <label>Sim</label>
                                            <input type="checkbox" checked={this.state.atheleteChecked === NO} onChange={this.onChangeAtheleteCheckbox.bind(this, NO)}/>
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
                        <input className="search-people-input" placeholder="Search" onChange={this.onChangeSearchInput}/>
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
                            <th className="person-name-header" onClick={this.orderByName}>
                                <div className="person-header">
                                    NOME
                                    <div className="order-icon-group">
                                        <div className="order-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path className="name-desc-icon-path icon-path" stroke="currentColor" strokeWidth="1" fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                                            </svg>
                                        </div>
                                        <div className="order-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path className="name-asc-icon-path icon-path" stroke="currentColor" strokeWidth="1" fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </div>                      
                                    </div>
                                </div>
                            </th>
                            <th className="person-height-header" onClick={this.orderByHeight}>
                                <div className="person-header header-right">
                                    ALTURA (m)
                                    <div className="order-icon-group">
                                        <div className="order-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path className="height-desc-icon-path icon-path" stroke="currentColor" strokeWidth="1" fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                                            </svg>
                                        </div>
                                        <div className="order-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path className="height-asc-icon-path icon-path" stroke="currentColor" strokeWidth="1" fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </div>                      
                                    </div>
                                </div>
                            </th>
                            <th>LACTOSE</th>
                            <th className="person-weight-header" onClick={this.orderByWeight}>
                                <div className="person-header header-right">
                                    PESO (kg)
                                    <div className="order-icon-group">
                                        <div className="order-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path className="weight-desc-icon-path icon-path" stroke="currentColor" strokeWidth="1" fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                                            </svg>
                                        </div>
                                        <div className="order-icon">
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path className="weight-asc-icon-path icon-path" stroke="currentColor" strokeWidth="1" fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                            </svg>
                                        </div>                      
                                    </div>
                                </div>
                            </th>
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
                                <td className="person-height">
                                    <div className="ordered-data">
                                        {Number(person.height).toFixed(2)}
                                    </div>
                                </td>
                                <td className="person-lactose">
                                    {person.lactose ? <div className="status positive-status">SIM</div> : <div className="status negative-status">NÃO</div>}
                                </td>
                                <td className="person-weight">
                                    <div className="ordered-data">
                                        {Number(person.weight).toFixed(2)}
                                    </div>
                                </td>
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