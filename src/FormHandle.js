import React, { Component } from 'react';


class FormHandle extends Component{
    constructor(props){
        super(props);
        this.state = {
            quest:'',
            reward:'',
            poi:''
        };

    }


    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
      }

    //basically half of the entire website gets rendered out here
    render(){
        return(
          <div className="MAIN_DIV">
            <img alt="Field Research Finder: Oxford MS" className="main_banner" src="website_banner.png"/>
              <p className="research_text">This is a Pokemon GO fansite and tool for helping others locate desireable Field Research Tasks from PokeStops.</p>
              <p className="research_text">To use, input the Field Research Task, the Pokemon you got as a reward from the Field Research task, and the PokeStop where you obtained the task.</p>
              <p className="research_text">As a quick start, try "Catch 7 Pokemon", "Magikarp", and "Baxter Hall". Note that spelling matters, and the PokeStop names must be the same as in-game.</p>
              <p className="research_text">You can click on the icon for the Pokemon to go to its dex entry, and click on the name of the PokeStop to view directions in Google Maps.</p>
              <p className="research_text">Anything can go in the Task section, and it can be left blank.</p>
              <p className="research_text">Other Pokemon you can use to test this website are "Raichu", "Drifloon", "Lanturn", and "Sableye".</p>
              <p className="research_text">Other points of interest you can use to test this website are "Lyceum", "Dead House Historical Marker", "Ole Miss Natatorium", and "Robert C. Khayat Law Center".</p>


              <form onSubmit={(e)=>{this.props.handleSubmit(e, this.state.quest, 
                  this.state.reward, 
                  this.state.poi)}}>
              <div className="questBox">
              <label htmlFor='quest'>
                <input type="text" 
                name='quest'
                placeholder='Task'
                value={this.state.quest} 
                onChange={this.handleChange} />
              </label>
              </div>
              <div className="rewardBox">
              <label htmlFor='reward'>
                <input type="text" 
                name='reward'
                placeholder='Reward'
                value={this.state.reward} 
                onChange={this.handleChange} />
              </label>
              </div>
              <div className="poiBox">
              <label htmlFor='poi'>
                <input type="text" 
                name='poi'
                placeholder='PokeStop'
                value={this.state.poi} 
                onChange={this.handleChange} />
              </label>
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        )
    }

}

export default FormHandle;