import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import './favorito.css'

function Favoritos(){
    const [filmes, setFilmes] = useState([])

    useEffect( ()=>{
        const minhalista = localStorage.getItem('@primeflix')
        setFilmes(JSON.parse(minhalista) || [])
    },[] )

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item)=> {
            return(item.id !== id) 
        })
        setFilmes(filtroFilmes)
        localStorage.setItem('@primeflix', JSON.stringify(filtroFilmes))
        toast.success('Filme removido com sucesso!')
    }


    return(
        <div className='meus-filmes'>
            <h1>
                Meus filmes
            </h1>
            {filmes.length === 0 && <h3>Você nâo possui nenhum filme salvo :( </h3>}
            <ul>
                {filmes.map( (filme)=>{
                    return(
                        <li key={filme.id}>
                            <span><strong>{filme.title}</strong></span>
                            <img src={`https://image.tmdb.org/t/p/original${filme.poster_path}`} alt={filme.title}/>
                            <div>
                                <Link to={`/filme/${filme.id}`}>
                                    Ver detalhes
                                </Link>
                                <button onClick={()=> excluirFilme(filme.id)}>
                                    Excluir
                                </button>
                            </div>
                        </li>
                    )
                } )}
            </ul>
        </div>
    )
}

export default Favoritos