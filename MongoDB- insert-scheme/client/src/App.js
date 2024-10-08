import './App.css';
import {useState} from "react";



function App() {

let[friends,setFriends] = useState([]);

let getFriendsFromServer = async()=>{

  let reqOptions={
    method:"GET"
  }

let JSONData= await fetch("http://localhost:2024/getFriends",reqOptions);

let JSOData = await JSONData.json();

setFriends(JSOData);


console.log(JSOData);


}


  return (
    <div className="App">
    <button onClick={()=>{
      getFriendsFromServer();
    }}>Get Friends</button>
    {friends.map((ele,i)=>{
      return<h1 key={i}>{ele.firstName}{" "}{ele.lastName}</h1>
     })}
    </div>
  );
}

export default App;
