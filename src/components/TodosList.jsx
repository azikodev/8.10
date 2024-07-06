import { useFirestore } from "../hooks/useFirestore";
function TodosList({ data }) {
  const { deleteTodo } = useFirestore();

  return (
    <>
      <h1 className="mb-8">TodosList</h1>
      <div className="grid grid-cols-4 gap-24 ">
        {data &&
          data.map((todo) => {
            return (
              <div
                key={todo.id}
                className="card bg-base-100 w-96 shadow-xl border-2 flex items-center max-w-[250px] px-[24px] py-[8px]"
              >
                <h3>{todo.title}</h3>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="btn btn-sm btn-secondary"
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default TodosList;
