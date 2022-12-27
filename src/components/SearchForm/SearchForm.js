import './SearchForm.css';

function SearchForm(props){
    return (
        <form className='search-form' action='#' name='searchForm'>
        <input type='text' name="keywords" placeholder='Enter topic' className='search-form__input'/>
        <button type='submit' className='search-form__submit-button'>Search</button>

        </form>
    )

}
export default SearchForm;