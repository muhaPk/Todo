import React, {useCallback, useState} from 'react'
import { Wrapper } from "./components/Wrapper";
import { Form } from "./components/Form"
import { Task } from "./components/Task"


function App() {

    const listStorage = localStorage.getItem("tasks")
    const listStorageData = JSON.parse(listStorage)

    const [tasks, setTasks] = useState(listStorageData ? listStorageData : []);

    const setTaskslocalStorage = useCallback( newTasks => {
        localStorage.setItem("tasks", JSON.stringify(newTasks))
    },[])

    const addTask = useCallback( ({task, description}) => {

        const newTask = {
            id: (new Date()).getTime(),
            name: task,
            description: description,
            status: 1,
        }
        setTasks([...tasks, newTask])
        setTaskslocalStorage([...tasks, newTask])
    },[tasks, setTaskslocalStorage])

    const removeTask = useCallback( (id) => {

        const filterTasks = tasks.filter((obj) => obj.id !== id)
        setTasks(filterTasks)
        setTaskslocalStorage(filterTasks)
    },[tasks, setTaskslocalStorage])

    const editTask = useCallback( (id, data) => {

        const obj = tasks.find((obj) => obj.id === id)
        const index = tasks.indexOf(obj)

        let newObj = obj
        newObj.name = data.task
        newObj.description = data.description
        tasks.splice(index, 1, newObj)

        setTasks(tasks)
        setTaskslocalStorage(tasks)
    },[tasks, setTaskslocalStorage])

    const doneTask = useCallback(id => {
        const obj = tasks.find((obj) => obj.id === id)
        const status = obj.status
        const index = tasks.indexOf(obj)

        let newObj = obj
        newObj.status = status === 1 ? 2 : 1

        tasks.splice(index, 1, newObj)

        setTaskslocalStorage(tasks)
    },[tasks, setTaskslocalStorage])

  return (

      <Wrapper>
        <Form addTask={addTask} />
        { tasks.map((data) => <Task key={data.id} data={data} removeTask={removeTask} editTask={editTask} doneTask={doneTask} />) }
      </Wrapper>

  );

}

export default App;
