import {type ChangeEvent, type SubmitEvent, useState} from "react";
import useCreateTask from "../hooks/useCreateTask.ts";

const TaskCreatePage = () => {
  const { mutate } = useCreateTask();

  const [formData, setFormData] = useState({
    name: '',
  });

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name) {
      return alert('Ingresa el nombre de la tarea');
    }

    try {
      await mutate(formData);

      alert('Tarea creada');
    } catch (error: unknown) {
      alert('Error al crear la tarea: ' + error);
    }
  };

  return (
    <form onSubmit={ event => handleSubmit(event) }>
      <div>
        <label>Nombre</label>
        <input name='name' onChange={ handleFieldChange } />
      </div>

      <button>Crear</button>
    </form>
  );
}

export default TaskCreatePage;