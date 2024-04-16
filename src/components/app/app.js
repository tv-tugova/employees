import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Ann C.', salary: 1000, increase: false, rise: true, id: 1},
                {name: 'John M.', salary: 2000, increase: true, rise: false, id: 2},
                {name: 'Mary W.', salary: 3000, increase: false, rise: false, id: 3}
            ],
            term: '',
            filter: 'Все сотрудники'
        };
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = { 
            name,
            salary,
            increase: false,
            rise: false,
            id: this.maxId++};
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => {
            return {
                data: data.map(item => {
                    if (item.id == id) {
                        return {...item, [prop]: !item[prop]}
                    }
                    return item;
                })
            }
        })
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term: term});
    }

    filterEmp = (items, filter) => {
        if (filter === 'З/П больше 1000$') {
            return items.filter(item => {
                return item.salary > 1000;
            })
        } else if (filter === 'На повышение') {
            return items.filter(item => {
                return item.rise;
            })
        }
    }

    onUpdateFilter = (filter) => {
        this.setState({filter: filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const employees = data.length;
        const increased = data.filter(item => item.increase).length;
        const visibleData = this.searchEmp(data, term);
        const filteredData = filter === 'Все сотрудники' ? visibleData : this.filterEmp(data, filter);
        return (
            <div className="app">
                <AppInfo
                    employees={employees}
                    increased={increased}/>
    
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onUpdateFilter={this.onUpdateFilter}/>
                </div>
            
                <EmployeesList 
                    data={filteredData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm
                    onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;


