import { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "../users/UserItem";
import GithubContext from "../../context/github/GithubContext";

const UserResults = () => {
  const { users, loading } = useContext(GithubContext);

  if (!loading) {
    return (
      <div className="grid-col-1 md:grid-col-2 lg:grid-col-3 xl:grid-col-4 grid gap-8">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserResults;
