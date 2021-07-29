import { useState } from 'react';
import randomColor from 'randomcolor';
import { isPrime } from './primeNumberCheck';
import { wrap } from 'comlink';
import './App.css';

const App = () => {
  const [color, setColor] = useState('#33839B');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('')

  return (
    <div className='container' style={{background: color}}>
      <h1 className='title'>Parallel computing in React using<br/><strong>Web-Workers</strong></h1>
      <div className='prime-number-checker'>
        <h2>Prime number checker</h2>
        <p className='description'>checking if <strong style={{fontWeight: 600}}>850047799</strong> is a prime number or not</p>
        <div className='btns'>
          <button 
            className='prime-check-btn' 
            onClick={async () => {
              await setStatus('checking...');
              await setResult('');
              setResult(await isPrime(850047799));
              setStatus('');
            }}
          >
            Without Web-Workers
          </button>
          <button 
            className='prime-check-btn'
            onClick={async () => {
              const worker = new Worker('./worker', { name: 'checkPrimeWorker', type: 'module' });
              const { isPrime: isPrimeWorker } = wrap(worker);
              await setStatus('checking...');
              await setResult('');
              setResult(await isPrimeWorker(850047799));
              setStatus('');
            }}
          >
            With Web-Workers
          </button>
        </div>
        {!!result ?
          <p className='result'>850047799 is {`${result? '' : 'not'}`} a prime number</p>
          : <p className='result'>{status}</p>
        }
      </div>
      <button className="change-color-btn" style={{color}} onClick={() => setColor(randomColor({luminosity: 'bright'}))}>Change color</button>
    </div>
  );
}

export default App;
