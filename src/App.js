import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RepoIcon from './components/RepoIcon';
import StarIcon from './components/StarIcon';
import ForkIcon from './components/ForkIcon';

function App() {
  const [repos, setRepos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const url = 'https://gh-trending-api.herokuapp.com/repositories';
  useEffect(() => {
    axios.get(url)
    .then(res => {
      // console.log(res.data);
      setRepos(res.data);
      setIsLoaded(true);
    }).catch(error =>{
      console.log('unable to fetch!')
      setIsLoaded(true);
    });
  },[]);
  const repoList = repos.map((repo,index) => {
    const contributers = repo.builtBy.map((dev,index) => {
      return (
        <li key={index}><a href={dev.url} title={dev.username}><img src={dev.avatar} alt={dev.username}/></a></li>
      );
    });
    return (
      <div key={index} className='repolist'>
        <div className='tile'>
          {/* { repo.rank } */}
          <RepoIcon/>
          <a href={ repo.url } target="_blank"><span>{ repo.username } / { repo.repositoryName }</span></a>
          <p className='description'>{repo.description}</p>
          <p>
            <span className='brick'>{repo.language}</span>
            <span className='brick'><StarIcon/> {repo.totalStars}</span>
            <span className='brick'><ForkIcon/> {repo.forks}</span>
            <ul>Built by &nbsp;&nbsp;{contributers}</ul>
          </p>
          <p className='stars-today'><StarIcon/> <span>{repo.starsSince} stars today</span></p>
        </div>
      </div>
    );
  }
);
  return (
    <div className="App">
      <header className="App-header">
        {/* {
          <img src={logo} className="App-logo" alt="logo" />
        } */}
        <div class="text-center">
          <h1 class="h1">Trending</h1>
          <p>See what the GitHub community is most excited about today.</p>
        </div>
      </header>
      <div className='repository-container'>
        <p className='title'>Repositories</p>
        {/* <img src={logo} className="App-logo" isLoaded={isLoaded} alt="logo" /> */}
        {repoList}
      </div>
    </div>
  );
}

export default App;
