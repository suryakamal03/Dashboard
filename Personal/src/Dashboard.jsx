import React,{useState,useEffect} from "react";
function Dashboard(){
  const [priority,setpriority] = useState([]);
  const [habit,sethabit] = useState([]);
  const [monday,setmonday] = useState('');
  const [tuesday,settuesday] =useState('');
  const [wednesday,setwednesday] = useState('');
  const [thursday,setthursday] = useState('');
  const [friday,setfriday]= useState('');
  const [saturday,setsaturday] = useState('');
  const [sunday,setsunday] = useState('');
  const [habitDays, setHabitDays] = useState({
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false
});
  useEffect(()=>{

  })
  const handleDayChange = (day) => {
  setHabitDays(prev => ({
    ...prev,
    [day]: !prev[day]
  }));
};
function Switch(){

  }

  return(
    // top
    <div className="contains">
      <div className="topright">
        <button onClick={Switch}>Mode</button>
      </div>
      <div className="top">
        <h1>Personal Dashboard</h1>
        <span className="dateandtime">Time</span>
      </div>
  {/* weeklypriority */}
      <div className="weeklypriority">
        <h3>Weekly priority</h3>
        <div className="prioritytasks">

        </div>
        <input type="text" placeholder="Add a priority..." value={priority} onChange={(e) =>setpriority(e.target.value)} />
        <button className="prioritybtn">Add</button>
      </div>
      <div className="habittracker">
        <h3>Habit Tracker</h3>
        <div className="habitdays">
        <h5>Habit</h5>
        <h3>M</h3> 
        <h3>T</h3>
        <h3>W</h3>
        <h3>T</h3>
        <h3>F</h3>
        <h3>S</h3>
        <h3>S</h3> 
        </div>  
        <div className="habittasks">
            <span ><input type="checkbox" checked={habitDays.monday}  onChange={() => handleDayChange('monday')} /></span>
            <span><input type="checkbox" checked={habitDays.tuesday}  onChange={() => handleDayChange('tuesday')} /></span>
            <input type="checkbox" checked={habitDays.wednesday}  onChange={() => handleDayChange('wednesday')} />
            <input type="checkbox" checked={habitDays.thursday}  onChange={() => handleDayChange('thursday')} />
            <input type="checkbox" checked={habitDays.friday}  onChange={() => handleDayChange('friday')} />
            <input type="checkbox" checked={habitDays.saturday}  onChange={() => handleDayChange('saturday')} />
            <input type="checkbox" checked={habitDays.sunday}  onChange={() => handleDayChange('sunday')} />

        </div>
        <input type="text" placeholder="Add a Habit.." value={habit} onChange={(e)=> sethabit(e.target.value)}/>
        <button className="habitbtn">Add</button>
      </div>
      <div className="Days">
        <div className="monday">
          <div className="mondaytasks">

          </div>
          <input type="text" placeholder="Add monday task." value={monday} onChange={(e)=> setmonday(e.target.value)}/>
          <button className="mondaybtn">Add</button>
        </div>
        <div className="tuesday">
          <div className="tuesdaytasks">

          </div>
          <input type="text " placeholder="Add tuesday task." value={tuesday} onChange={(e)=> settuesday(e.target.value)} />
          <button className="tuesdaybtn">Add</button>
        </div>
        <div className="wednesday">
          <div className="wednesdaytasks">
            
          </div>
          <input type="text" placeholder="Add wednesday task." value={wednesday} onChange={(e)=> setwednesday(e.target.value)}/>
          <button className="wednesdaybtn">Add</button>
        </div>
        <div className="thursday">
          <div className="thursdaytasks">

          </div>
          <input type="text" placeholder="Add Thursday task." value={thursday} onChange={(e)=> setthursday(e.target.value)}/>
          <button className="thursdaybtn">Add</button>
        </div>
        <div className="friday">
          <div className="fridaytasks">

          </div>
          <input type="text" placeholder="Add Friday task." value={friday} onChange={(e)=> setfriday(e.target.value)} />
          <button className="fridaybtn">Add</button>
        </div>
        <div className="saturday">
          <div className="saturdaytasks">

          </div>
          <input type="text" placeholder="Add saturday task." value={saturday} onChange={(e)=> setsaturday(e.target.value)} />
          <button className="saturdaybtn">Add</button>
        </div>
        <div className="sunday">
          <div className="sundaytasks">

          </div>
          <input type="text" placeholder="Add sunday task." value={sunday} onChange={(e)=> setsunday(e.target.value)}/>
          <button className="sundaybtn">Add</button>
        </div>

      </div>
    </div>
  )
}
export default Dashboard