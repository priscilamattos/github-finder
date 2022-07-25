import PropTypes from "prop-types";
import { useContext } from "react";

import GithubContext from "../../context/github/GithubContext";
import RepoItem from "./RepoItem";

const RepoList = ({ repos }) => {
  const { getUserRepos } = useContext(GithubContext);

  return (
    <div className="card rounded-lg bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title my-4 text-3xl font-bold">
          Latest Repositories
        </h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
};

RepoList.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default RepoList;
