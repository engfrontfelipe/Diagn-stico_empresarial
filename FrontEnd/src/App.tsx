import './App.css'
import { LoginForm } from './components/ui/login-form'
import grove from "./assets/grovefav.png"

function App() {
  const URL = 'http://localhost:3333/usuarios/list'

  
  const chamarApi = async () => {
    const resp = await fetch(URL)
      try{
        const obj = await resp.json()
          console.log(obj);
      
        }catch(err){
          console.log('Nao foi possivel acessar a api');
         
    }

    
  }
  
  chamarApi()

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-10 w-10 items-center justify-center rounded-md  text-primary-foreground">
             <img src={grove} alt="Logo grove" className='w-full h-full' />
            </div>
            Grove Tech
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://wallpapers.com/images/hd/4k-tech-l48mhptfmfh7vmuu.jpg"
          alt="Image tecnology"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default App
