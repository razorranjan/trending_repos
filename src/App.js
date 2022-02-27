import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RepoIcon from './components/RepoIcon';
import StarIcon from './components/StarIcon';
import ForkIcon from './components/ForkIcon';

function App() {
  const [repos, setRepos] = useState([]);
  const url = 'https://gh-trending-api.herokuapp.com/repositories';
  useEffect(() => {
    axios.get(url)
    .then(res => {
      // console.log(res.data);
      setRepos(res.data);
    }).catch(error =>{
      console.log('unable to fetch!')
    });
  },[]);
  const repoList = repos.map((repo,index) => {
    const contributers = repo.builtBy.map((dev,index) => {
      return (
        <li key={index}><a href={dev.url} title={dev.username} rel='noreferrer'><img src={dev.avatar} alt={dev.username}/></a></li>
      );
    });
    return (
      <div key={index} className='repolist'>
        <div className='tile'>
          <RepoIcon/>
          <a href={ repo.url } target="_blank" rel='noreferrer'><span>{ repo.username } / { repo.repositoryName }</span></a>
          <p className='description'>{repo.description}</p>
          <div className='bottomline'>
            {
              repo.language ? <span className='brick'>{repo.language}</span> : ''
            }
            <a href={ repo.url + "/stargazers"} target="_blank" rel='noreferrer'><span className='brick'><StarIcon/> {repo.totalStars}</span></a>
            <a href={ repo.url + "/network/members." + repo.repositoryName } target="_blank" rel='noreferrer'><span className='brick'><ForkIcon/> {repo.forks}</span></a>
            <ul>Built by &nbsp;&nbsp;{contributers}</ul>
          </div>
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
        <div className="text-center">
          
          <h1> <img src={logo} className="App-logo" alt="logo" />Trending</h1>
          <p>See what the GitHub community is most excited about today.</p>
        </div>
      </header>
      <div className='repository-container'>
        <p className='title'>Repositories</p>
        {repoList}
      </div>
    </div>
  );
}

export default App;
