import "./style.css"
import {useEffect, useState} from "react"
import mongoose from 'mongoose';




const CATEGORIES = [
  { name: "Project", color: "#3b82f6" },
  { name: "Task", color: "#16a34a" },
  { name: "Goal", color: "#ef4444" },
  { name: "Objective", color: "#eab308" },
  // { name: "entertainment", color: "#db2777" },
  // { name: "health", color: "#14b8a6" },
  // { name: "history", color: "#f97316" },
  // { name: "news", color: "#8b5cf6" },
];

const initialTasks = [
  {
    id: 1,
    text: " AcademicLife OS",
    source: "https://opensource.fb.com/",
    category: "Project",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Test the web application thoroughly to ensure it is functioning properly and without errors.",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "Task",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "To improve academic performance by increasing overall GPA by one point within the next semester.",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "Objective",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// function Counter(){
//   const[Count, setCount]= useState(0);
//   return <div>
//     <span style= {{fontSize: "40px"}}>{Count}</span>
//     <button className="btn btn-large" onClick={() => setCount((Count) => Count+1)}>+1</button>
//   </div>
// }

function App() {
  
  //1.define state variable
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);
  

  return (
    <>
      {/* 2.use state variable */}
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <AddForm setTasks={setTasks} setShowForm={setShowForm}/> : null}

      <main className="main">
        <Category />       
        <DashBoard tasks={tasks}/>
      </main>
    </>
  );
}

function Header({showForm, setShowForm}){
  return(
    <header className="header">
      <div className="logo">
          <img src="logo.png" height="68" width="68" alt="AcademicOS Logo"/>
          <h1>AcademicOS</h1>
      </div>
      {/* update state variable */}
      <button className="btn btn-large btn-open"
        onClick={() => setShowForm((show) => !show)}>
        {showForm? "Close" : "Add"} 
      </button>
    </header>

  );
}

function Category(){
  return(
  <aside>
    <ul>
      <li className = "category"><button className="btn btn-all-categories">All</button></li>
      {CATEGORIES.map((cat) => 
        <li key={cat.name} className="category" ><button className="btn btn-catergory"
          style={{backgroundColor: cat.color}}>{cat.name}
        </button></li>)}
    </ul>
  </aside>
  );
}

function AddForm({setTasks , setShowForm}){
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCatergory] = useState("");

  function handleSubmit(e){
    //1.prevent browser reload
    e.preventDefault();
    console.log(text,source,category);// get the input data from the form
    // 2. check the data is valid, create a new fact
    if(text && source && category){
    //3. Create a new fact object
      const newTask = {
        id: Math.round(Math.random()*10000000),
        text: text,
        source: source,
        category: category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      }
    //4.add the new fact to the UI
      setTasks((tasks) => [newTask, ...tasks]);
    //5. reset the input field 
      setText('');
      setSource('');
      setCatergory('');
    //6.close the entire form
      setShowForm(false);
    }
  }

  return(
    <form className="add-form " onSubmit={handleSubmit}>

      <input type="text" 
        placeholder="To do" 
        value = {text}
        onChange={(e)=>setText(e.target.value)}
      />

      <span>length: {text.length}</span>

      <input value={source} 
        type="text" 
        placeholder="TrustWorthy source..."
        onChange={(e)=>setSource(e.target.value)}
      />

      <select 
        value={category} onChange={(e)=>
        setCatergory(e.target.value)}>
          <option value="">Choose categorty</option>
          {CATEGORIES.map((cat) => 
            (<option key={cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)
          )}
      </select>

        <button class="btn btn-large ">post</button>

    </form>
  );
}

function DashBoard({tasks}){

  return(
    <section> <ul className = "dashBoard-list">
      {
        tasks.map((task) => (<Task  task={task} key = {task.id} />))
      }
    </ul>
    <p>There are {tasks.length} things on your to-do-list</p>
    </section>
  );
}

function Task({task}){
  return(
    <li className = "dashBoard">
      <p> 
        {task.text} 
      </p>

      <span className="tag"
      style={{backgroundColor: CATEGORIES.find(
        (cat) => cat.name === task.category
        ).color,
      }}>{task.category}</span>

        <div className="vote-btn">
            <button>👍<strong>{task.votesInteresting}</strong></button> 
            <button>😶‍🌫️<strong>9{task.votesMindblowing}</strong></button>
            <button>🚫<b>4{task.votesFalse}</b></button>
        </div>
    </li>
  );
}

export default App;
