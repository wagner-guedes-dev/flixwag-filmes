import './header.css'
import { Link } from 'react-router-dom'

function Header(){
    return(
        <div className='menu-responsive'>
            <header>
                <Link className='logo' to='/'>Prime Flix </Link>
                <Link className='favoritos' to='/favoritos'>Meus Filmes</Link>
            </header>
        </div>
        
    )
}

export default Header;