import React from 'react'
import LineItem from './LineItem'

const ItemList = ({ items, handleCheck, handleDelete}) => {
  return (

    <main>
        
        {items.length ? (
            <ul>
                {/* {items.map((item) => (
                    <li className="item" key={item.id}>
                        <input type="checkbox"
                        onChange={()=>handleCheck(item.id)}
                        checked={item.checked} />
                        <label
                            style={(item.checked)? {textDecoration: 'line-through'} : {textDecoration: 'none'}} 
                            onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
                        <FaTrashAlt role='button' tabIndex="0" onClick={()=>handleDelete(item.id)}/>
                    </li>
                ))} */}
                
                {items.map((item)=>(
                <LineItem 
                    key={item.id}
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
                ))}
            </ul>
        ) : (
            <p style={{marginTop: '2rem'}}>List is Empty for now</p>
        )}

    </main>

  )
}

export default ItemList