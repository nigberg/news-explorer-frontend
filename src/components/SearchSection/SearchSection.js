import './SearchSection.css';
import SearchForm from '../SearchForm/SearchForm'

function SearchSection({onSearch}){
    return(
        <section className='search-section'>
        <h1 className='search-section__title'>What's going on in the world?</h1>
        <p className='search-section__text'>Find the latest news on any topic and save them in your personal account.</p>
        <SearchForm onSearch={onSearch}/>

        </section>
    )
}
export default SearchSection;