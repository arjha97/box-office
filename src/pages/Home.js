import React, {useState} from 'react';
import MainPageLayout from '../components/MainPageLayout';
import {apiGet} from '../misc/config';

const Home = () => {

    const [input, setInput] = useState('');
    const [results, setResults] = useState(null);
    const [searhOption, setSearchOption] = useState('shows');

    const isShowSearch = searhOption === 'shows';

    const onInputChange = e => {
      setInput(e.target.value);
    }

    const onSearch = () => {
       
      apiGet(`/search/${searhOption}?q=${input}`).then(result => setResults(result));       
    }

    const onKeyDown = e => {
        if(e.keyCode === 13){
            onSearch();
        }
    }

    const renderResults = () => {
      if(results && results.length === 0){
        return <div>No results</div>
      }

      if(results && results.length > 0){
        return results[0].show ? (results.map(item => <div key={item.show.id}>{item.show.name}</div>)) : (
          results.map(item => <div key={item.person.id}>{item.person.name}</div>)
        )
      }

      return null;
    }

    const onRadioChange = e => {
      setSearchOption(e.target.value);
    }

    return (
        <MainPageLayout>
          <input type="text"
           onChange={onInputChange} 
           onKeyDown={onKeyDown} 
           value={input}
           placeholder='Search for Something'
           />

           <div>
             <label htmlFor="shows-search">
               Shows
               <input id="shows-search" type='radio' value='shows'
               checked={isShowSearch}
               onChange={onRadioChange}/>
             </label>
           </div>

           <div>
             <label htmlFor="actors-search">
               Actors
               <input id="actors-search" type='radio' value='people'
               checked={!isShowSearch}
               onChange={onRadioChange}/>
             </label>
           </div>

          <button type="button" onClick={onSearch}>Search</button>
          {renderResults()}
        </MainPageLayout>
    )
}

export default Home
