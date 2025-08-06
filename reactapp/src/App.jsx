import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


//Class Components

const Card = ({ title, ratings, isCool, actors }) => {
  const [count, setCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  
  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [title, hasLiked]
  );

    useEffect(() => {
    console.log(`${title} has a click count of ${count}`);
  }, [title, count]
  );

  //common useEfect
  useEffect(() => {
    console.log('card rendered');
  },[]);

  
  
  return (
    <div className='card' onClick={() => setCount((prevState) => prevState+1)}>
      <h2>{title} <br/>{count}</h2>

      <button onClick={(event) => {
            event.stopPropagation();
             setHasLiked(!hasLiked);}
        }>

        {hasLiked ? 'Liked' : 'Like'}
      </button>

    </div>
  )
}

const App1 = () => {


  return (
    <div className="card-container">

      <Card title="Star Wars" ratings={5} isCool={true} actors={[{ name: 'actors' }]} />
      <Card title="Lion King" />
      <Card title="Avatar" />

    </div>
  )
}



export default App1
