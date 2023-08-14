import { useState } from "react";


export default function SignUpForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setFormSubmitted(true);
        if (username.length !== 8) {
            setUsernameError('Username must be eight characters in length.');
            return;
          }
        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup",
            {
              method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
              }
            );
const result = await response.json();
setToken(result.token);
setUsername("");
setPassword("");
console.log(result);
        } catch (error) {
          setError(error.message);
        }
      }
      const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setUsernameError(''); // Clear error message when user starts typing
      };  
        
      
return (
<>
<h2>Sign Up!</h2>
{error && <p>{error}</p>}
<form onSubmit={handleSubmit}>
<label>
    {/* Username:{" "} <input value={username} onChange={(e) => setUsername(e.target.value)} /> */}
    <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          {formSubmitted && usernameError && <p className="error">{usernameError}</p>}
</label>
<label>
    Password:{" "} <input value = {password} onChange={(e) => setPassword(e.target.value)}/> 
</label>
<button type="submit">Submit</button>
</form>
</>
);
}