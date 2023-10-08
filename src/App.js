import './App.css';
import Footer from './Footer';
import Header from './Header';
import Content from './Content';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';

import { useState, useEffect } from 'react';

function App() {

   /*  const [items,setItems]=useState([
      {
          id: 1,
          checked: true,
          item: "Potato chips"
      },
      {
          id: 2,
          checked: false,
          item: "Tomatoes"
      },
      {
          id: 3,
          checked: false,
          item: "Fresh Juice"
      }
    ]); */

    const API_URL = 'http://localhost:3500/items';
    /* const[items,setItems]=useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);*/              //if without API
    const[items,setItems]=useState([]);
    const [newItem,setNewItem]=useState('');
    const [search, setSearch] = useState('');
    const [fetchError,setFetchError]=useState(null);
    const [isLoading,setIsLoading]=useState(true);

/*     useEffect(()=>{
      localStorage.setItem('shoppinglist',JSON.stringify(items));
    },[items]) */

    useEffect(()=>{
      const fetchItems = async () => {
        try{
          const response = await fetch(API_URL);
          if(!response.ok) throw Error('Did not recieve expected data')
          const listItems = await response.json();
          console.log(listItems);
          setItems(listItems);
          setFetchError(null);
        } catch (err){
          setFetchError(err.message);
        }
        finally{
          setIsLoading(false);
        }
      }
      setTimeout(()=>{fetchItems()},2000) //Just to simulate real time loading
      
    },[])

  const addItem = async (item) => {
    const id=items.length ? items[items.length-1].id + 1 : 1;
    const myNewItem = {id,checked:false,item};
    const listItems=[...items,myNewItem];
    setItems(listItems);
    /* localStorage.setItem('shoppinglist',JSON.stringify(listItems)); */             //useEffect takes care of this
  
    const postOptions = {
      method : 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL,postOptions)
    if (result) setFetchError(result);
  }



  const handleCheck = async (id) => {
      const listItems = items.map((item)=>item.id === id? {...item,checked:!item.checked} : item);
      setItems(listItems);
      /* localStorage.setItem('shoppinglist',JSON.stringify(listItems)); */            //useEffect takes care of this
  
      const myItem=listItems.filter((item)=>item.id===id);
      const updateOptions = {
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({checked:myItem[0].checked})

      };
      const reqUrl=`${API_URL}/${id}`;
      const result=await apiRequest(reqUrl, updateOptions);
      if(result) setFetchError(result);
  }

  const handleDelete = async (id) => {
      const listItems = items.filter((item) => item.id !== id);
      setItems(listItems);
      /* localStorage.setItem('shoppinglist',JSON.stringify(listItems)); */              //useEffect takes care of this
  
      const deleteOptions = { method: 'DELETE' };
      const reqUrl = `${API_URL}/${id}`;
      const result = await apiRequest(reqUrl, deleteOptions);
      if (result) setFetchError(result);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem)
    setNewItem('');
    console.log('added')
  }

  return (
    <div className='App'>
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error : ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => (item.item).toLowerCase().includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer 
        length={items.length}
      />

    </div>
  );
}

export default App;
