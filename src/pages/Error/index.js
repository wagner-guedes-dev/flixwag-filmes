import './error.css'
import {Link} from 'react-router-dom'

function Error(){
    return(
        <div className='not-found'>
            <h1>404</h1>
            <h2>Pagina nâo encontrada</h2>
            <Link to='/'>Veja todos os filmes!</Link>
        </div>
        )
}
export default Error;