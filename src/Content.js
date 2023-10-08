import React from 'react'
import ItemList from './ItemList';
const Content = ({ items, handleCheck, handleDelete}) => {

   // const [name,setName] = useState('yashu')

   /*  const handleNameChange = () => {
        const names=['yashu','dhoni','steph'];
        const int=Math.floor(Math.random()*3);
        setName(names[int]);
    }

    const handleClick = (name) => {
        console.log(`${name} was calledd for`)
    } */


    return (
        <>
           {/*  <p>
                Hello {name} 
            </p>
            <button onClick={handleNameChange}>Change the name</button>
            <br />
            <button onClick={()=>handleClick('Yashu')}>Click me</button> */}

            {items.length ? (
               /*  <ul>
                    {items.map((item) => (
                        <li className="item" key={item.id}>
                            <input type="checkbox"
                            onChange={()=>handleCheck(item.id)}
                            checked={item.checked} />                                                                   //MOVED ALL THIS TO ItemList.js for clear understanding and readibilty
                            <label
                                style={(item.checked)? {textDecoration: 'line-through'} : {textDecoration: 'none'}} 
                                onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
                            <FaTrashAlt role='button' tabIndex="0" onClick={()=>handleDelete(item.id)}/>
                        </li>
                    ))}
                </ul> */
                <ItemList
                        items={items}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                />
            ) : (
                <p style={{marginTop: '2rem'}}>No items</p>
            )}
        </>
    )
}

export default Content