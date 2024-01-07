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

  const handleOperationChange = (e) => {
    const new_op = e.target.value;
    // let array = [];
    // for (let i = 0; i < N; i++) {
    //   array.push(tree.get(i));
    // }
    
    let new_tree;

    if (new_op === "add") {
      new_tree = new SegTree(N,(a,b)=>a+b,0);
    } else if (new_op === "mul") {
      new_tree = new SegTree(N,(a,b)=>a*b,1);
    } else if (new_op === "max") {
      new_tree = new SegTree(N,(a,b)=>Math.max(a,b),-Infinity);
    } else {
      console.log("error");
    }

    for (let i = 0; i < N; i++) {
      new_tree.update(i,Math.floor(Math.random()*10));
    }

    setTree(new_tree);
    setQueryResult(new_tree.query(query[0],query[1]));

    setOp(new_op);

  }




  return (
    <div className="App">
      <h1>Segment Tree Demonstration</h1>


      <div className="query-input">
        <h2>Query</h2>
        <p> Put your query here </p>
        Query the sum of the range 
        [
        <input type="number" name="query" value={query[0]} onChange={(e)=>{setQuery([parseInt(e.target.value),query[1]]);setQueryResult(tree.query(parseInt(e.target.value),query[1]));setTree(tree)}}/>
        ,
        <input type="number" name="query" value={query[1]} onChange={(e)=>{setQuery([query[0],parseInt(e.target.value)]);setQueryResult(tree.query(query[0],parseInt(e.target.value)));setTree(tree)}}/>
        )
        <br/>
      </div>

      <div className="query-result">
        <h2>Query Result</h2>
        <p>{query_result}</p>
      </div>



      <div className='array'>
        <h2>Array</h2>
        <div className="array-items">
          {
            content.map((value,index)=>{
              return <input type="Number" name="query" value={tree.get(index)} onChange={(e)=>{tree.update(index,parseInt(e.target.value));setQueryResult(tree.query(query[0],query[1]));setTree(tree);console.log(op)}}/>
            })
          }

        
        </div>
      </div>
  
      <div className="segtree">
        <h2>Segment Tree Visualization</h2>
      <SegBlock segtree={tree} node_index={1} className="seg-block"/>
      </div>




      <div className="footer">
        <p>Created by <a href="https://github.com/ryoryon66">ryoryon66</a></p>
      </div>
    </div>


  );
}

export default App;
