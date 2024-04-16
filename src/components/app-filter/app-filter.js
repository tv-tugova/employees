import { Component } from "react";
import "./app-filter.css";

class AppFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: ''
        }
    }

    onUpdateFilterLocal = (e) => {
        const filter = e.target.textContent;
        this.setState({filter: filter});
        this.props.onUpdateFilter(filter);
    }

    render() {
        return (
            <div className="btn-group">
                <button type="button"
                        className={`btn ${this.props.filter === 'Все сотрудники' ? 'btn-light' : 'btn-outline-light'}`}
                        onClick={this.onUpdateFilterLocal}>
                        Все сотрудники
                </button>
                <button type="button"
                        className={`btn ${this.props.filter === 'На повышение' ? 'btn-light' : 'btn-outline-light'}`}
                        onClick={this.onUpdateFilterLocal}>
                        На повышение
                </button>
                <button type="button"
                        className={`btn ${this.props.filter === 'З/П больше 1000$' ? 'btn-light' : 'btn-outline-light'}`}
                        onClick={this.onUpdateFilterLocal}>
                        З/П больше 1000$
                </button>
            </div>
        )
    }
}

export default AppFilter;