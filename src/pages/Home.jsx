import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { useSelector } from "react-redux";
import { TodosList } from "../components";

function Home() {
  const { user } = useSelector((state) => state.user);
  const { data } = useCollection("todos", ["uid", "==", user.uid]);

  return (
    <div className="flex items-center flex-col justify-start">
      <Link to="/create" className="my-8">
        <button className=" btn btn-secondary bg-[green] border-none">Create todos  </button>
      </Link>
      <div>{data && <TodosList data={data} />}</div>
    </div>
  );
}

export default Home;
