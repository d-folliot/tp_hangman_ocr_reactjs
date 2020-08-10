import React from 'react';
import './App.css';


const DEFAULTKEYLIST = Array.from(Array(26).keys()).map(( y) => { return {keyname : String.fromCharCode(y + 65), used : false}});   
const WORDLIST = ['Finances', 'Mince', 'Almanach', 'Cabane', 'Grenade', 'Noisette', 'Cadeau', 'Sourcils', 'Drapeaux', 'Construire', 
'Desserrer', 'Impulsion','Volaille','Caresse','Couvent', 'Cravate','Excursion', 'Vitrine', 'Blessure'];

function LetterKey(props){
  return <div type="submit" className={"letterkey " + (props.used?"used" : "unused")} onClick={props.onClick} >{props.keyname}</div>;
}

function Keyboard(props){    
  return <div className="keyboard" >
  {
    props.keylist.map( 
    (key) =><LetterKey keyname={key.keyname} used={key.used} key={key.keyname} onClick={() => props.onClick(key.keyname)}/> )
  }
  </div> ;
}

function Hangman(props){
  return <div className="hangman"></div>;
}


function Word ({word}){
  return <div className="word">
      {word.split("").map((letter, index) => <div className="letter" key={index}>{letter}</div>  )}
    </div>
}


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {keylist : DEFAULTKEYLIST, currentword:" " ,finalword: ""};    
  }  

  componentDidMount(){
    this.newgame();
  }

  //utilisation de this 
  newgame = () =>{  
    let finalword= WORDLIST[Math.floor(Math.random() * WORDLIST.length)].toUpperCase();
    let currentword = (finalword.split("").map(letter => '_')).join("");
    this.setState({finalword:finalword, currentword:currentword, keylist : DEFAULTKEYLIST});
  }

  // utilisation de this
  keyhit = key =>{    
    let keylist=this.state.keylist.map((item) => { return{ keyname: item.keyname, used : (item.keyname===key)? true : item.used }});
    let currentword = this.state.currentword.split("");
    for (let i=0; i<currentword.length; i++){
      if (this.state.finalword[i]=== key)
        currentword[i] = key;
    }
    this.setState({keylist:keylist, currentword: currentword.join("")});
  }

  render() {
    return <div className="wrapper">
      <Hangman/>
      <Word word={this.state.currentword}/>
      {
        this.state.currentword ===this.state.finalword ? 
          <div className="newgamediv"><p className="newgametxt">Félicitation!</p><button onClick={this.newgame} className="newgame"> Nouvelle partie </button></div>
          : <Keyboard keylist={this.state.keylist} onClick={this.keyhit}/> 
      }
      <footer></footer>
      </div>
  }
}

export default App;
