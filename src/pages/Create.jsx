//rrd imports
import { Form, useActionData } from "react-router-dom";

//redux
import { useSelector } from "react-redux";

//custom hooks
import { useFirestore } from "../hooks/useFirestore";

//components
import { FormCheckbox, FormInput } from "../components";

//hook
import { useEffect } from "react";

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  let completed = formData.get("completed");
  return { title, completed };
};

function Create() {
  const userData = useActionData();
  const { user } = useSelector((state) => state.user);

  const { addTodo } = useFirestore();

  useEffect(() => {
    if (userData) {
      const newTodo = {
        title: userData.title,
        completed: userData.completed,
        uid: user.uid,
      };
      addTodo(newTodo);
    }
  }, [userData]);

  return (
    <div className="grid grid-cols-2">
      <div className="card bg-base-100 w-96 shadow-xl p-8">
        <Form method="post" className="flex flex-col items-center gap-5">
          <h2 className="text-3xl font-semibold">New todo</h2>
          <FormInput name="title" type="text" label="Todo title" />
          <FormCheckbox name="completed" />
          <button type="submit" className="btn btn-primary btn-block">
            Add
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Create;
