import React from 'react';
import { ReactComponent as Lock } from './lock.svg';

export default function App() {
  const [passData, setPassData] = React.useState({
    pass_length: 20,
    special: true,
    number: true,
    lowercase: true,
    uppercase: true,
    password: '',
  });

  function handleChange(event) {
    setPassData((prevData) => {
      const { name, value, type, checked } = event.target;
      return {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(passData.password);
  }

  function genratePassword() {
    const lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
    const upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const number = '1234567890';
    const special = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    let str = '';
    str += passData.lowercase ? lowerAlpha : '';
    str += passData.uppercase ? upperAlpha : '';
    str += passData.number ? number : '';
    str += passData.special ? special : '';
    let pass = '';
    for (let i = 1; i <= passData.pass_length; i++) {
      let char = str.charAt(Math.floor(Math.random() * str.length + 1));
      str = str.replace(char, '');
      pass += char;
    }
    setPassData((prevData) => ({ ...prevData, password: pass }));
  }

  return (
    <div className='App'>
      <div className='Heading'>
        <Lock fill='#157EFB' className='logo' />
        <h1 className='Heading--text'>Secure Password Generator</h1>
      </div>
      <div className='main'>
        <div>Length</div>
        <div className='range-box'>
          <input
            type='range'
            name='pass_length'
            value={passData.pass_length}
            onChange={handleChange}
            id='length'
            min='8'
            max='32'
            step='1'
          />
          <label htmlFor='length'>{passData.pass_length}</label>
        </div>
        <div>Special</div>
        <div>
          <input
            type='checkbox'
            name='special'
            checked={passData.special}
            onChange={handleChange}
            id='special'
          />
          <label htmlFor='special'>@#$%</label>
        </div>
        <div>Number</div>
        <div>
          <input
            type='checkbox'
            name='number'
            checked={passData.number}
            onChange={handleChange}
            id='number'
          />
          <label htmlFor='number'>123456</label>
        </div>
        <div>Lowercase</div>
        <div>
          <input
            type='checkbox'
            name='lowercase'
            checked={passData.lowercase}
            onChange={handleChange}
            id='lowercase'
          />
          <label htmlFor='lowercase'>abcdefgh</label>
        </div>
        <div>Uppercase</div>
        <div>
          <input
            type='checkbox'
            name='uppercase'
            checked={passData.uppercase}
            onChange={handleChange}
            id='uppercase'
          />
          <label htmlFor='uppercase'>ABCDEFGH</label>
        </div>
      </div>
      <div className='password'>
        <button onClick={genratePassword}>Generate Password</button>
        <input
          type='text'
          name='password'
          value={passData.password}
          onChange={handleChange}
          id='password'
        />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
    </div>
  );
}
