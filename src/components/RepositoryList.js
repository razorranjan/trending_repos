import RepositoryListItem from './RepositoryListItem';

function RepositoryList(repos) {
    // console.log(repos);
    const repoList = repos.map((repo,index) => {
        return <RepositoryListItem props={repo}/>
    });
    return ( 
        {repoList}
     );
}

export default RepositoryList;