import React, { Component, useState } from 'react';
import firebase from './firebase'
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import db from './firebase'
import { getDatabase, ref, onValue} from "firebase/database";


// POKEMON  https://api.jsonbin.io/b/617230484a82881d6c63c520
// POI:     https://api.jsonbin.io/b/617230904a82881d6c63c52f


class TaskList extends Component{

    constructor(props){
        super(props);

        this.state = {
            DATA_POI:null,
            DATA_MON:null,
            urlMon_icon:'',
            urlMon_dex:'',
            urlPoi:'',
            taskArray:null
        };

    }

    //fetching apis
    async componentDidMount() {

        //recomment to test form submission
        const test = await this.getTasks();
        // console.log(test);
        this.setState({taskArray:test});
        

        fetch("https://api.jsonbin.io/b/617230904a82881d6c63c52f")
        .then(res=>res.json())
        .then(
            (result) => {
                this.setState({
                    DATA_POI : result
                });
            },
            (error) => {
                this.setState({
                    error : error
                })
            }
        )

        fetch("https://api.jsonbin.io/b/617230484a82881d6c63c520")
        .then(res=>res.json())
        .then(
            (result) => {
                this.setState({
                    DATA_MON : result
                });
            },
            (error) => {
                this.setState({
                    error : error
                })
            }
        )
    }

    //if this isn't a repeat of the last task, start the process of making a new task
    componentDidUpdate(prevProps){
        if (prevProps.poi!==this.props.poi || prevProps.quest!==this.props.quest || prevProps.reward!==this.props.reward){
            this.dataSearch();
        }

        
    }

    //searching jsons for relevant data and setting them to the states
    dataSearch=()=>{
        let monNum='';
        let monName='';
        let lat='';
        let lng='';
        let poiName='';
        let urlPoi='';
        let currQuest = this.props.quest;

        if (!this.state.DATA_POI || !this.state.DATA_MON){
            return;
        }
        //search poi data
        for (let i = 0; i < this.state.DATA_POI.length; i++){
            const DATA_POI_NAME = this.state.DATA_POI[i].Name ? this.state.DATA_POI[i].Name : null;
            if (DATA_POI_NAME && this.props.poi && (DATA_POI_NAME.toLowerCase() === this.props.poi.toLowerCase())) {
                
                lat = this.state.DATA_POI[i].Latitude;
                lng = this.state.DATA_POI[i].Longitude;

                poiName = this.state.DATA_POI[i].Name;
                urlPoi = `https://maps.google.com/?q=${lat},${lng}`
                
             }
        }
        //search mon data
        for (let i = 0; i < this.state.DATA_MON.length; i++) {
            const DATA_MON_NAME = this.state.DATA_MON[i].name ? this.state.DATA_MON[i].name.toLowerCase() : null;

            if (DATA_MON_NAME && this.props.reward && (DATA_MON_NAME.toLowerCase() === this.props.reward.toLowerCase())) {
                monNum = this.state.DATA_MON[i].species_id;

                monName = this.state.DATA_MON[i].name;


                   if (monNum <= 10){
                        monNum="00"+monNum;
                   }
                   else if (monNum >= 10 && monNum < 100){
                        monNum="0"+monNum;
                   }
                }
             }
        
        //quick check to have some default for a blank task field
        //gonna let people get away with not putting anything in for task because it would be convenient for me, a player

        if (currQuest === ''){
            currQuest = '(Blank Task)'
        }

        //console logging errors
        if (poiName === '' || monNum === ''){
            if(monNum===''){
                console.log("error monnum");
                alert("Pokemon not found. Please check your spelling.")
            }
            else if(poiName === '' ){
                console.log("error latlng");
                alert("Point of Interest not found. Please check your spelling.")
            }
        } 

        else{
            this.sendTask(poiName, lat, lng, monName, monNum, currQuest)
         }
    }


   //send data to firebase
    sendTask = async(poiName, lat, lng, monName, monNum, currQuest) => {
        const tempID = this.state.taskArray ? this.state.taskArray.length+1 : 0
        const final_Task = {
            id: tempID,
            final_Quest: currQuest,
            final_poiURL: `https://maps.google.com/?q=${lat},${lng}`,
            final_poiName: poiName,
            final_monName: monName,
            final_monDexURL: 'https://serebii.net/pokemongo/pokemon/'+monNum+'.shtml',
            final_monIconURL: 'https://serebii.net/pokedex-sm/icon/'+monNum+'.png'
        }
       const docRef = await addDoc(collection(db, "taskCollection"), final_Task);
        const taskArray = this.state.taskArray || [];
        taskArray.push(final_Task)
        this.setState({taskArray})
        console.log("Document written with ID: ", docRef.id); 
        
    }

    //get data from firebase
    getTasks = async()=>{
        const querySnapshot = await getDocs(collection(db, "taskCollection"));
        const tempArray = [];
        querySnapshot.forEach((doc) => {
            tempArray.push(doc.data())
        });
        return tempArray;
    }
    
 //render out the task from the array objects
    render(){
        return(
            <div className="TASK_BODY">
                <ul>
                    {this.state.taskArray && this.state.taskArray.length > 0 ? 
                    this.state.taskArray.map ( task => (
                        <li key={task.id}>
                            <div className="TASK_ENTRY">
                                <p>
                                    <a href={`${task.final_monDexURL}`}>
                                        <img className="monIcon" src={`${task.final_monIconURL}`} alt={`${task.final_monName}`} 
                                        title={`Click for dex entry for ${task.final_monName}.`}/>
                                    </a>
                
                                    {task.final_Quest}, at: 
                                    {' '}
                                    <a href={`${task.final_poiURL}`}>
                                        {task.final_poiName}
                                    </a>
                                </p>
                            </div>
                        </li>
                    )):null}
                </ul>
            </div>
        )
    }
}

export default TaskList;