import RepoIcon from './RepoIcon';

function RepositoryListItem(repo) {
    console.log(repo);
    const contributers = repo.builtBy.map((dev,index) => {
        return (
            <li key={index}><a href={dev.url}><span><img src={dev.avatar}/></span>{dev.username}</a></li>
        );
    });
    const repoListItem = repo.map((repo,index) => {
        return (
            <div key={index} className='repolistitem'>
                <div className='tile'>
                    { repo.rank }
                    <RepoIcon/>
                    <a href={ repo.url } target="_blank"><span>{ repo.username } / { repo.repositoryName }</span></a>
                    <p>Forks : <span>{repo.forks}</span></p>
                    <p>Stars : <span>{repo.totalStars}</span></p>
                </div>
                <div className='expand-details hidden'>
                    <p>
                        Description : <span>{repo.description}</span>
                    </p>
                    <p>
                        Programming language : <span>{repo.language}</span>
                    </p>
                    <p>
                        Contributions by : <span>{repo.language}</span>
                    </p>
                    <ul>{contributers}</ul>
                </div>
            </div>
        );
    });
    return ( 
        {repoListItem}
     );
}

export default RepositoryListItem;