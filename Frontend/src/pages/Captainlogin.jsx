import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import CaptainRaahiLogo from '../logos/t2.png'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => 
{
  const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const { captain , setCaptain } = React.useContext(CaptainDataContext);
      const navigate = useNavigate();

      const submitHandler = async (e) => {
          e.preventDefault(); 
          const captain = {
              email:email,
              password
          }
         

          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);

          if(response.status === 200)
          {
            const data = response.data;

            setCaptain(data.captain)
            localStorage.setItem('token',data.token)
            navigate('/captain-home')

            // Log captain geolocation after successful sign-in
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    console.log('Captain signed in - current location:', latitude, longitude);
                }, (err) => {
                    console.warn('Geolocation unavailable at captain sign-in:', err);
                    if (navigator.permissions && navigator.permissions.query) {
                        navigator.permissions.query({ name: 'geolocation' }).then((p) => {
                            console.log('Geolocation permission state (captain sign-in):', p.state);
                        }).catch((permErr) => console.warn('Permissions API error:', permErr));
                    }
                });
            }


          }
          setEmail('');
          setPassword('');
      }

    return (
        <div className='py-5 px-5 flex flex-col justify-between h-screen'>
            <div>   
                <img className='w-15 h-8 mb-5 ' src={CaptainRaahiLogo} alt='' />

            <form onSubmit= {(e)=>
                {
                    submitHandler(e)
            }}>
                <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
                <input 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-[#eeeeee] mb-7 py-2 px-4 border rounded w-full text-lg placeholder:text-base'
                type="email" 
                placeholder='email@example.com' />
                
                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

                <input 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-[#eeeeee] mb-7 py-2 px-4 border rounded w-full text-lg placeholder:text-base'
                type="password" 
                placeholder='password' />

                <button className='bg-[#111] text-white font-semibold mb-3 py-2 px-4 rounded w-full text-lg placeholder:text-base'>Login</button>
            <p className = 'text-center'>New here? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
            </form>
            </div>
            <div>   
                <Link 
                to='/login'
                className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 py-2 px-4 rounded w-full text-lg placeholder:text-base'>
                Sign in as User</Link>
            </div>
        </div>
  )
}

export default Captainlogin