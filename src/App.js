import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {withAuthenticator} from 'aws-amplify-react';
import Amplify, {Analytics, Storage, API, graphqlOperation} from 'aws-amplify';

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`

class App extends Component {
    post = async () => {
        console.log('calling api');
        const response = await API.post('myapi', '/items', {
            body: {
                id: '1',
                name: 'hello amplify!'
            }
        });
        alert(JSON.stringify(response, null, 2));
    }
    get = async () => {
        console.log('calling api');
        const response = await API.get('myapi', '/items/object/1');
        alert(JSON.stringify(response, null, 2));
    }
    list = async () => {
        console.log('calling api');
        const response = await API.get('myapi', '/items/1');
        alert(JSON.stringify(response, null, 2));
    }
    todoMutation = async () => {
        const todoDetails = {
            name: 'Party tonight!',
            description: 'Amplify CLI rocks!'
        };

        const newEvent = await API.graphql(graphqlOperation(addTodo, todoDetails));
        alert(JSON.stringify(newEvent));
    }

    listQuery = async () => {
        console.log('listing todos');
        const allTodos = await API.graphql(graphqlOperation(listTodos));
        alert(JSON.stringify(allTodos));
    }

    recordEvent = () => {
        console.log("about to record event...");
        Analytics.record({
            name: "Test Event 1",
            attributes: {
                username: 'bujinwang'
            }
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <button onClick={this.recordEvent}>Record Event</button>
                    <input type="file" onChange={this.uploadFile}/>
                    <button onClick={this.listQuery}>GraphQL Query</button>
                    <button onClick={this.todoMutation}>GraphQL Mutation</button>


                    <button onClick={this.post}>POST</button>
                    <button onClick={this.get}>GET</button>
                    <button onClick={this.list}>LIST</button>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default withAuthenticator(App);
