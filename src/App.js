import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
// const socket = io.connect('http://localhost:4000');

const socket = io.connect('https://test-chatapp.azurewebsites.net');


const Style = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

function App() {
  const [myState, setMyState] = useState({message: '', name: ''});
  const [chat, setChat] = useState([
    {message: 'one', name: 'chris'},
    {message: 'two', name: 'world'}
  ]);


  useEffect(()=> {
    console.log(socket)
  }, socket)


  useEffect(()=> {
    socket.on('message', ({name, message}) => {
      setChat([...chat, {name, message}])
    })
  })

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const {name, message} = myState;
    socket.emit('message', {name, message});
    setMyState({message: '', name})
  }

  const renderChat = () => {
    return chat.map(({name, message}, index) => (
      <div key={index}>
        <h3>{name}: <span>{message}</span></h3>
      </div>
    ))
  }

  return (
    <Style>
      hello world

      <div className='card'>
        <form onSubmit={onMessageSubmit}>
          <h1>messenger</h1>
          <div className='name-field'>
            <input name='name' 
            value={myState.name} 
            onChange={(e)=>setMyState({...myState, name: e.target.value})}
            label='Name'
            />
          </div>
          <div className='message-field'>
            <input name='message' 
            value={myState.message} 
            onChange={(e)=>setMyState({...myState, message: e.target.value})}
            label='Message'
            />
          </div>
          <button>send message</button>
        </form>

        <div className='render-chat'>
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
      </div>
    </Style>
  );
}

export default App;
