import logo from './logo.svg';
import './App.css';
import SegTree from './structure/segtree';
import SegBlock from './components/SegBlock';
import { useState } from 'react';

const N = 16;

let segtree = new SegTree(N,(a,b)=>a+b,0);

for (let i = 0; i < N; i++) {
  segtree.update(i,Math.floor(Math.random()*10));
}


function App() {



  const [query, setQuery] = useState([0,N]);
  const [query_result, setQueryResult] = useState(segtree.query(query[0],query[1]));
  const [tree, setTree] = useState(segtree);
  const [op, setOp] = useState("add");


  let content = [];
  for (let i = 0; i < N; i++) {
    content.push(tree.get(i));
  } 

  const handleQueryChange = (e) => { 
    console.log(e.target.value);
    let value = parseInt(e.target.value);
    let is_left = e.target.name === "left";

    let new_query;

    if (is_left) {
      new_query = [value,query[1]];
      setQuery([value,query[1]]);

    }
    else {
      new_query = [query[0],value];
      setQuery([query[0],value]);
    }

    setQueryResult(tree.query(new_query[0],new_query[1]));
  }

  const handleArrayChange = (e) => {
    // console.log(e.target.value);
    let index = parseInt(e.target.name);
    let val = parseInt(e.target.value);

    let new_tree = null;
    if (op === "add") new_tree = new SegTree(N,(a,b)=>a+b,0);
    else if (op === "mul") new_tree = new SegTree(N,(a,b)=>a*b,1);
    else if (op === "max") new_tree = new SegTree(N,(a,b)=>Math.max(a,b),-Infinity);
    else console.log("error");

    for (let i = 0; i < N; i++) {
      new_tree.update(i,tree.get(i));
    }


    new_tree.update(index,val);
    setTree(new_tree);
    setQueryResult(new_tree.query(query[0],query[1],false));

  }

  const handleOpChange = (e) => {
    let new_op = e.target.value;
    setOp(new_op);

    let new_tree = null;
    if (new_op === "add") new_tree = new SegTree(N,(a,b)=>a+b,0);
    else if (new_op === "mul") new_tree = new SegTree(N,(a,b)=>a*b,1);
    else if (new_op === "max") new_tree = new SegTree(N,(a,b)=>Math.max(a,b),-Infinity);
    else console.log("error");

    for (let i = 0; i < N; i++) {
      new_tree.update(i,Math.floor(Math.random()*10));
    }


    setTree(new_tree);
    setQueryResult(new_tree.query(query[0],query[1],false));

  }
  

  return (
    <div className="App">
      <h1>Segment Tree Demonstration</h1>
      <div className="query-input">
        <h2>Query</h2>
        Query the {{"add":"sum","mul":"product","max":"maximum"}[op]} of the range 
        [
        <input type="number" name="left" value={query[0]} onChange={handleQueryChange}/>
        ,
        <input type="number" name="right" value={query[1]} onChange={handleQueryChange}/>
        )
        <br/>
      </div>

      <div className="query-result">
        <h2>Query Result</h2>
        <p>{query_result}</p>
      </div>

      <div className='array'>
        <h2>Array</h2>
        <p> 0-indexed array of length {N} </p>
        <div className="array-items">
          {
            content.map((value,index)=>{
              return <input type="Number" name={index} value={value} onChange={handleArrayChange}/>
            })
          }

        
        </div>
      </div>
  
      <div className="segtree">
        <h2>Segment Tree Visualization</h2>
      <SegBlock segtree={tree} node_index={1} className="seg-block"/>
      </div>

      <div className="setop">
        <h2>Change the Operation</h2>
        <label>
          <input type="radio" name="op" value="add" onChange={handleOpChange} checked={op === "add"}/>
          Addition
        </label>

        <label>
          <input type="radio" name="op" value="mul" onChange={handleOpChange} checked={op === "mul"}/>
          Multiplication
        </label>

        <label>
          <input type="radio" name="op" value="max" onChange={handleOpChange} checked={op === "max"}/>
          Maximum
        </label>
      </div>

      <div className="footer">
        <p>Created by <a href="https://github.com/ryoryon66">ryoryon66</a></p>
      </div>

    </div>


  );
}

export default App;
