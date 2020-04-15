import React from 'react';
import './App.css';

function LetterKey(props){
  return <div type="submit" className={"letterkey " + (props.used?"used" : "unused")} onClick={props.onClick} >{props.keyname}</div>;
}

function Keyboard(props){    
  return <div className="keyboard" >
  {
    props.keylist.map( 
    (key) =><LetterKey keyname={key.keyname} used={key.used} key={key.keyname} onClick={() => props.onInteraction(key.keyname)}/> )
  }
  </div> ;
}

function Hangman(props){
  return <div className="hangman">

  </div>;
}

function Letter(props){
  return <div className="letter">
    {props.letter}
  </div>;
}

function Word (props){
  return <div className="word">
    {props.word.split("").map((letter) => <Letter letter={letter} key={letter.id}/> )}
  </div>
}


class App extends React.Component {
  constructor(props){
    super(props);
    let keylist = Array.from(Array(26).keys()).map(( y) => { return {keyname : String.fromCharCode(y + 65), used : false}});
    console.log(keylist);
    this.state = {keylist : keylist, currentword:"___________" ,finalword: "MACHINTRUC"};
  }

  keyhit(key){
    console.log("you hit the key " + key);

  }
  render() {
    return <div className="wrapper">
      <Hangman/>
      <Word word={this.state.currentword}/>
      <Keyboard keylist={this.state.keylist} onInteraction={(key)=>this.keyhit(key)}/> 
      <footer></footer>
      </div>
  }
}

export default App;
