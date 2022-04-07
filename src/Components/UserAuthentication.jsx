import React, { useState } from 'react'
import SignInOption from './SignInOption'

export default function UserAuthentication() {
    let data = {username:"",password:"",city:"",WebServer:"",role:"",signOn:[]}




    function SignOn()
    {
        return(<tr>
                <td>Single Sign-on to the following:</td>
                <td>
                    
                    <input type="checkbox" name="signON" value="Mail"  />
                    <label for="mail">Mail</label>
                    <br/>
                    <input type="checkbox" name="signON" value="Payroll" />
                    <label for="payroll">Payroll</label>
                    <br/>
                    <input type="checkbox"  name="signON" name="selfService" />
                    <label for="selfService">selfService</label>
                </td>
            </tr>)
    }
    function Role()
    {
        return(<tr>
            <td>Please Specify your role:</td>
            <td onChange={handleRole}>
                <input type="radio" value="Admin" id="admin" name="role"/>
                <label for="admin">Admin</label>
                <br/>
                <input type="radio" value="Engineer" id="engineer" name="role"/>
                <label for="engineer">Engineer</label>
                <br/>
                <input type="radio" value="Manager" id="manager" name="role"/>
                <label for="manager">Manager</label>
                <br/>
                <input type="radio" value="Guest" id="guest" name="role"/>
                <label for="guest">Guest</label>
            </td>
        </tr>)
    }

    function WebServer()
    {
        return(
            <tr>
                <td><label for="server">Web Server:</label></td>
                <td><select name="server" id="server" onChange={handleSelect}>
                    <option selected>{server?server:"---Choose a Server---"}</option>
                    <option value="Google Cloud">Google Cloud</option>
                    <option value="Amazon Web Services">Amazon Web Services</option>
                    <option value="Microsoft Azure">Microsoft Azure</option>
                    </select>
                </td>
            </tr>
        )
    }

    const [user,setUser] = useState({
        username:"",
        password:"",
        city:"",
    })


    const [error,setError] =useState({
        userError:false,
        passError:false
    })

    const [role,setRole] = useState("")


    const [server,setServer] = useState("")

    const [signOn,setSignOn] = useState([])


     

    


    function handleRole(e)
    {
        e.preventDefault()
        setRole(e.target.value)
    }
    console.log(role)
    function handleSelect(e)
    {
        setServer(e.target.value)
        
    }
 
    function handleClick(e)
    {
        const checked = e.target.checked
        console.log(checked)
        if(checked)
        {
            const value = e.target.value
            setSignOn(preValue=>{
                return[...preValue,value]
            })
        }
        
        
    }
    



    function handleUser(e)
    {
        const {name,value} = e.target;

        setUser(preValue=>{
            if(name==="username")
            {
                return{
                    username:value,
                    password:preValue.password,
                    city:preValue.city
                }
            }
            else if(name==="userpass")
            {
                return{
                    username:preValue.username,
                    password:value,
                    city:preValue.city
                }
            }
            else{
                    return{nusername:preValue.username,
                    password:preValue.password,
                    city:value
                    }
            }
        })
    }

   

   function handleSubmit(e)
    {
        
        e.preventDefault()
        if(user.username==="")
        {
            setError(preValue=>{
                return{
                    userError:true,
                    passError:preValue.passError
                }
            })
        }

        else
        {
            setError(preValue=>{
                return{
                    userError:false,
                    passError:preValue.passError
                }
            })
        }

        if(!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8}/).test(user.password))
        {
            setError(preValue=>{
                return{
                    userError:preValue.userError,
                    passError:true
                }
            })
        }
        else{
            setError(preValue=>{
                return{
                    userError:preValue.userError,
                    passError:false
                }
            })
        }



    }

function handleSave(){
    
}


    function handleReset()
    {
        setError({
            userError:false,
            passError:false
        })
    }
    data.username=user.username
        data.password=user.password
        data.city=user.city
        data.WebServer=server
        data.role=role
        data.signOn=signOn


  return (
    <div>
        <form onSubmit={handleSubmit} onReset={handleReset}>
        <table>
            <tr>
                <td><label for="username">Username:</label></td>
                <td><input type="text"  name="username" onChange={handleUser}/></td>
                <td>{error.userError?"Username can't be empty":""}</td>
            </tr>
            <tr>
                <td><label for="userpassword">Password:</label></td>
                <td><input type="password" onChange={handleUser}  name="userpass" /></td>
                <td>{error.passError?"Password must be required and must have 8 characters and at least 1 digit and atleast 1 upper or lower case.":""}</td>
            </tr>
            <tr>
                <td><label for="city">City of Employement:</label></td>
                <td><input type="text" id="city" onChange={handleUser} name="city"/></td>
            </tr>
            <WebServer/>
            <Role/>
            <SignOn/>
            
            
        </table>
    <div>
        <button type="submit">Validate</button>
        <button  onClick={handleSave}>Save</button>
        <button type="reset">Reset</button>
    
    </div>

    




    </form>
    <div>
        {data.username}
    </div>
    </div>
  )
}
