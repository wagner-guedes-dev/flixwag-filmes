import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api.js'
import { toast } from 'react-toastify'
import './filme-info.css'

function Filme(){
    const { id } = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)
    const linkTrailer = `https://www.youtube.com/results?search_query=${filme.title} trailer`

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:'a86813ef20b72e337216e5fc27b8fd47',
                    language:'pt-BR',
                }
            })
            .then((response)=> {
                setFilme(response.data)
                setLoading(false)
            })
            .catch(()=>{
                //console.log('FILME NAO ENCONTRADO')
                navigate('/',{replace: true})
                return
            })
        }
        loadFilme();
        
        return() =>{
            console.log('componenete desmontado')
        }
    }, [navigate, id])
    
    function salvarFilme(){
        const minhaLista = localStorage.getItem('@primeflix')

        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilmes = filmesSalvos.some( (filmesalvo)=>filmesalvo.id === filme.id)

        if(hasFilmes){
            toast.warn('Esse filme ja está na sua lista!')
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso!')
    }


    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes do filme...</h1>
            </div>
        )
    }


    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span><br/>
            <strong>Avaliação: {filme.vote_average.toFixed(2)} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={linkTrailer} >Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;