import React, { Component } from 'react';
import List from './components/List'
import './App.css';

let data = [
  "Alexander Hamilton",
  "Aaron Burr, Sir",
  "My Shot",
  "The Story of Tonight",
  "The Schuyler Sisters",
  "Farmer Refuted",
  "You'll Be Back",
  "Right Hand Man",
  "A Winter's Ball",
  "Helpless",
  "Satisfied",
  "The Story of Tonight (Reprise)",
  "Wait for It",
  "Stay Alive",
  "Ten Duel Commandments",
  "Meet Me Inside",
  "That Would Be Enough",
  "Guns and Ships",
  "History Has Its Eyes On You",
  "Yorktown (The World Turned Upside Down)",
  "What Comes Next?",
  "Dear Theodosia",
  "Non-Stop",
  "What'd I Miss?",
  "Cabinet Battle #1",
  "Take a Break",
  "Say No to This",
  "The Room Where It Happens",
  "Schuyler Defeated",
  "Cabinet Battle #2",
  "Washington On Your Side",
  "One Last Time",
  "I Know Him",
  "The Adams Administration",
  "We Know",
  "Hurricane",
  "The Reynolds Pamphlet",
  "Burn",
  "Blow Us All Away",
  "Stay Alive (Reprise)",
  "It's Quiet Uptown",
  "The Election of 1800",
  "Your Obedient Servant",
  "Best of Wives and Best of Women",
  "The World Was Wide Enough",
  "Who Lives, Who Dies, Who Tells Your Story"
];

class App extends Component {

  moveElement(elementToMove, newSuccessor) {
    console.log(elementToMove, newSuccessor);

    const elementToMoveIdx = data.indexOf(elementToMove);

    data = [...data.slice(0, elementToMoveIdx), ...data.slice(elementToMoveIdx + 1)];

    if (newSuccessor == null) {
      data = [...data, elementToMove];
      console.log(data)
    } else {
      const insertIndex = data.indexOf(newSuccessor);

      data = [...data.slice(0, insertIndex), elementToMove, ...data.slice(insertIndex)];
    }

    //TODO remove
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <List
          elements={data}
          onUpdate={this.moveElement.bind(this)}
        >{data}</List>
      </div>
    );
  }
}

export default App;