import React, {useState} from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import {apiGet} from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';

const Home = () => {

    const [input, setInput] = useLastQuery();
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
        return results[0].show ? 
           (
            <ShowGrid data={results}/>
           ) 
         : (
            <ActorGrid data={results}/>
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
