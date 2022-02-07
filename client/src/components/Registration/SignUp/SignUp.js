import React, {useState} from 'react';
import {useDispatch} from 'react-redux'
import { getСlient } from '../../../redux/actions/clientAC';
import { getPovar } from '../../../redux/actions/cookAC'
import {useNavigate } from "react-router-dom";



const SignUp = () => {

const [inputs, setInputs] = useState({name:'', email:'', password:''}) 
const [role, setRole] = useState('client')

let navigate = useNavigate();
const dispatch = useDispatch();


const inputHandler = (e) => {
  setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
};


const submitHandler = (e) => {
  e.preventDefault();
  // console.log(role);
  const newUser = {
    name: inputs.name,
    email: inputs.email,
    password: inputs.password,
    role
  }
  setInputs({name:'', email:'', password:''})

if(newUser.role === 'client') {
  
  return dispatch(getСlient(newUser, navigate))

} else if(newUser.role === 'cook') {
 return dispatch(getPovar(newUser, navigate))
}

}

  return (
    <form onSubmit={submitHandler} className="signin">
      <div className="logo signin__logo">
        &
        <strong className="logo__text"><i>COME<br></br>COOK</i></strong>
      </div>
      <div className="signin__content">
        <h2>Регистрация</h2>
        <input type="text" onChange={inputHandler} name='name' value={inputs.name} className="signin__login" placeholder="Введите имя" />
        <input type="email" onChange={inputHandler} name='email' value={inputs.email}  className="signin__login" placeholder="Введите email" />
        <input type="password" onChange={inputHandler} name='password' value={inputs.password}  className="signin__password" placeholder="Введите пароль" />
        <select onChange={(e) => setRole(e.target.value)} >
          
            <option value="client">Клиент</option>
            <option value="cook">Повар</option>
          
        </select>

        <button type="submit">Зарегистрироваться</button>
      
      </div>
    </form>
  )
}

export default SignUp