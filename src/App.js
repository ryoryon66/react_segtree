import logo from './logo.svg';
import './App.css';
import SegTree from './structure/segtree';
import SegBlock from './components/SegBlock';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { type } from '@testing-library/user-event/dist/type';

const initialN = 16;

let initialArray = new Array(2 * initialN).fill(0);


for (let i = 0; i < initialN; i++) {
  initialArray[i+initialN] = Math.floor(Math.random()*10);
}


let segtree = new SegTree(
  initialN,
  (a,b)=>a+b,
  0,
  initialArray,
  new Array(2*initialN).fill(false),
  new Array(2*initialN).fill(false),

);

segtree = segtree.changeOp("add");




function App() {

  const {t, i18n} = useTranslation();


  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };




  const [query, setQuery] = useState([0,initialN]);
  const [query_result, setQueryResult] = useState(segtree.query(0,initialN)[0]);
  const [tree, setTree] = useState(segtree);
  const [op, setOp] = useState("add");
  const [N, setN] = useState(initialN); 




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


    if (isNaN(new_query[0]) || isNaN(new_query[1])) {
      setQueryResult(NaN);
      return;
    }


    let res = tree.query(new_query[0],new_query[1]);

    let query_result = res[0];
    let is_used = res[1];
    let is_updated = new Array(2*N).fill(false);
    let array = tree.array.slice();
    let new_tree = new SegTree(N,(a,b)=>a+b,0,array ,is_updated,is_used);


    setTree(new_tree);
    setQueryResult(query_result);
  }

  const handleArrayChange = (e) => {
    // console.log(e.target.value);
    let index = parseInt(e.target.name);
    let val = parseInt(e.target.value);

    // console.log (index,val);

    let new_tree = tree.update(index,val);

    setTree(new_tree);

    if (isNaN(query[0]) || isNaN(query[1])) return;
    let res = new_tree.query(query[0],query[1]);
    let query_result = res[0];
    setQueryResult(query_result);

  }

  const handleOpChange = (e) => {
    let new_opcode = e.target.value;
    setOp(new_opcode);

    let new_tree = tree.changeOp(new_opcode);

    setTree(new_tree);

    let res = new_tree.query(query[0],query[1]);
    let query_result = res[0];
    setQueryResult(query_result);

  }



  const handleNChange = (e) => {
    let new_N = parseInt(e.target.value);
    setN(new_N);

    let new_tree = tree.change_num_elems(new_N);

    setTree(new_tree);
    setQuery([0,new_N]);
    setQueryResult(new_tree.query(0,new_N)[0]);
    return;
  }
  

  return (
    <div className="App">
      <h1>{t('segment_tree_demo')}</h1>
      <div className="query-input">
        <h2>{t('Query')}</h2>
        {t('query_range')} 
        [
        <input type="number" name="left" value={query[0]} onChange={handleQueryChange}/>
        ,
        <input type="number" name="right" value={query[1]} onChange={handleQueryChange}/>
        )
        <br/>
      </div>

      <div className="query-result">
        <h2>{t('Query Result')}</h2>
        <p>{(query_result)}</p>

      </div>

      <div className='array'>
        <h2>{t('Array')}</h2>
        <p> {t('array_description')} {N} </p>
        <p> {t('You can change the value of the array by changing the number below.')} </p>
        <div className="array-items">
          {
            content.map((value,index)=>{
              return <input type="Number" name={index} value={value} key={index} onChange={handleArrayChange}/>
            })
          }

        
        </div>
      </div>
  
      <div className="segtree">
        <h2>{t('Segment Tree Visualization')}</h2>
        <p>{t('how to read')}</p>
      <SegBlock segtree={tree} node_index={1} className="seg-block"/>
      </div>

      <div className="setop">
        <h2>{t('Change the Operation')}</h2>
        <label>
          <input type="radio" name="op" value="add" onChange={handleOpChange} checked={op === "add"}/>
          {t('addition')}
        </label>

        <label>
          <input type="radio" name="op" value="mul" onChange={handleOpChange} checked={op === "mul"}/>
          {t('multiplication')}
        </label>

        <label>
          <input type="radio" name="op" value="max" onChange={handleOpChange} checked={op === "max"}/>
          {t('maximum')}
        </label>
      </div> 


      <div className="setn">
        <h2>{t('Change the Size of the Array')}</h2>
        <p>{t('array_description')} {N} </p>
        {/* use radio bottun. choose from 2,4,8,16,32 */}
        <label>
          <input type="radio" name="n" value="2" onChange={handleNChange} checked={N === 2}/>
          2
        </label>
        <label>
          <input type="radio" name="n" value="4" onChange={handleNChange} checked={N === 4}/>
          4
        </label>
        <label>
          <input type="radio" name="n" value="8" onChange={handleNChange} checked={N === 8}/>
          8
        </label>
        <label>
          <input type="radio" name="n" value="16" onChange={handleNChange} checked={N === 16}/>
          16
        </label>
        <label>
          <input type="radio" name="n" value="32" onChange={handleNChange} checked={N === 32}/>
          32
        </label>
      </div>

      <div className="language">
        <h2>{t('Change the Language')}</h2>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('jp')}>日本語</button>
      </div>


      <div className="footer">
        <p>Created by <a href="https://github.com/ryoryon66">ryoryon66</a></p>
      </div>

    </div>


  );
}

export default App;
