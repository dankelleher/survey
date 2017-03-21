import React, { Component } from 'react';
import classNames from 'classnames';

import List from './components/List'
import Submit from './components/Submit'
import Subtitle from './components/Subtitle'
import './App.css';


const apiKey = 'iSZ2H9nI2K3PgcJPOgBcl9m8pdheDa8e5iLAotBP';
const url = 'https://w3fegea84b.execute-api.us-east-1.amazonaws.com/dev/survey/77'

// let data = [
//   "Alexander Hamilton",
//   "Aaron Burr, Sir",
//   "My Shot",
//   "The Story of Tonight",
//   "The Schuyler Sisters",
//   "Farmer Refuted",
//   "You'll Be Back",
//   "Right Hand Man",
//   "A Winter's Ball",
//   "Helpless",
//   "Satisfied",
//   "The Story of Tonight (Reprise)",
//   "Wait for It",
//   "Stay Alive",
//   "Ten Duel Commandments",
//   "Meet Me Inside",
//   "That Would Be Enough",
//   "Guns and Ships",
//   "History Has Its Eyes On You",
//   "Yorktown (The World Turned Upside Down)",
//   "What Comes Next?",
//   "Dear Theodosia",
//   "Non-Stop",
//   "What'd I Miss?",
//   "Cabinet Battle #1",
//   "Take a Break",
//   "Say No to This",
//   "The Room Where It Happens",
//   "Schuyler Defeated",
//   "Cabinet Battle #2",
//   "Washington On Your Side",
//   "One Last Time",
//   "I Know Him",
//   "The Adams Administration",
//   "We Know",
//   "Hurricane",
//   "The Reynolds Pamphlet",
//   "Burn",
//   "Blow Us All Away",
//   "Stay Alive (Reprise)",
//   "It's Quiet Uptown",
//   "The Election of 1800",
//   "Your Obedient Servant",
//   "Best of Wives and Best of Women",
//   "The World Was Wide Enough",
//   "Who Lives, Who Dies, Who Tells Your Story"
// ];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      results: [],
      submissionStatus: 'UNSUBMITTED'
    };
  }

  componentDidMount() {
    fetch(url, {headers: new Headers({ 'x-api-key': apiKey })})
      .then(response => response.json())
      .then(json => this.setState({data : json.elements }));
  }

  moveElement(elementToMove, newSuccessor) {
    console.log(elementToMove, newSuccessor);
    const oldData = this.state.data;

    const elementToMoveIdx = oldData.indexOf(elementToMove);

    let newData = [...oldData.slice(0, elementToMoveIdx), ...oldData.slice(elementToMoveIdx + 1)];

    if (newSuccessor == null) {
      newData = [...newData, elementToMove];
      console.log(newData)
    } else {
      const insertIndex = newData.indexOf(newSuccessor);

      newData = [...newData.slice(0, insertIndex), elementToMove, ...newData.slice(insertIndex)];
    }

    this.setState({data : newData });
  }

  submit() {
    this.setState({ submissionStatus: 'SUBMITTING' });

    fetch(url + '/response', {
      method: 'POST',
      body: JSON.stringify({
        elements: this.state.data
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-api-key': 'iSZ2H9nI2K3PgcJPOgBcl9m8pdheDa8e5iLAotBP'
      })
    }).then(this.getResults.bind(this));
  }

  getResults() {
    this.setState({ submissionStatus: 'SUBMITTED' });

    return fetch(url + '/response', {
      method: 'GET',
      headers: new Headers({
        'x-api-key': 'iSZ2H9nI2K3PgcJPOgBcl9m8pdheDa8e5iLAotBP'
      })
    }).then(response => response.json())
      .then(json => this.setState({results : json }));
  }

  render() {
    const appClasses = classNames({
      'App': true,
      'hidden' : !!this.state.results.length
    });

    const resultsClasses = classNames({
      'Results': true,
      'hidden' : !this.state.results.length
    });

    return (
      <div>
        <Subtitle submissionStatus={this.state.submissionStatus}/>
        <div className={appClasses}>
          <List
            elements={this.state.data}
            onUpdate={this.moveElement.bind(this)}
          >{this.state.data}</List>
          <Submit onClick={this.submit.bind(this)} submissionStatus={this.state.submissionStatus}/>
        </div>
        <div className={resultsClasses}>
          <List
            elements={this.state.results}
          >{this.state.results}</List>
        </div>
      </div>
    );
  }
}

export default App;