import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { api, app } from "../constants/index";

function Todo() {
    const [editMode, setEditMode] = useState(false);
    const [list, setList] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDue_date] = useState('');
    const [status, setStatus] = useState('');
    const [taskid, setTaskid] = useState('')


    const showTodo = async () => {
        try {
            const { data } = await axios.get(`${app.apiHost}${api.task}`)
            setList(data.response);
        } catch (error) {
            console.log(error);
        }
    }

    const addToDo = async (e) => {
        e.preventDefault();
        try {
            const add = await axios.post(`${app.apiHost}${api.task}`, { name, description, due_date, status });
            if (add.status === 200) {
                setName('');
                setDescription('');
                setDue_date('');
                setStatus('')



                showTodo();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editToDo = async (e,taskid) => {
        e.preventDefault();
        try {

            const editUrl = api.editTask.replace(":id", taskid);

            const add = await axios.put(`${app.apiHost}${editUrl}`, { name, description, due_date, status });
            if (add.status === 200) {
                setName('');
                setDescription('');
                setDue_date('');
                setStatus('')

                showTodo();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        showTodo();
    }, []);

    return (

        <div className="container">
            <div className="form bg-light" style={{ paddingBottom: "50px", paddingTop: "50px" }}>
                <h2 className='header d-flex justify-content-center '>To-Do App</h2>
                <br></br>
                <form onSubmit={editMode ? editToDo : addToDo}>
                    <div className="form-wraper" style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ flex: 1, marginRight: "10px" }}>
                            <input onChange={(e) => setName(e.target.value)} value={name} className="form-control" type="text" placeholder="name" name="name" ></input>
                        </div>
                        <div style={{ flex: 1, marginRight: "10px" }}>
                            <input onChange={(e) => setDescription(e.target.value)} value={description} className="form-control" type="text" placeholder="description" name="description" ></input>
                        </div>
                        <div style={{ flex: 1, marginRight: "10px" }}>
                            <input onChange={(e) => setDue_date(e.target.value)} value={due_date} className="form-control" type="date" placeholder="due_date" name="due_date" ></input>
                        </div>

                        <div style={{ flex: 1, marginRight: "10px" }}>
                            <input onChange={(e) => setStatus(e.target.value)} value={status} className="form-control" placeholder="Status" name="Status" type="text" />
                            <datalist >
                                <option value="Complete">Complete</option>
                                <option value="incomplete">incomplete</option>
                            </datalist>
                        </div>

                        {
                            editMode ?
                                <button type="submit" style={{ width: "200px", marginLeft: "10px" }} className="btn btn-success">Edit</button>
                                :
                                <button type="submit" style={{ width: "200px", marginLeft: "10px" }} className="btn btn-success">+ Add</button>
                        }
                    </div>
                </form>
                <br></br>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr. no</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Due date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>

                        {
                            list && list.map(d => (
                                <tr key={d.id}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.description}</td>
                                    <td>{d.due_date}</td>
                                    <td>{d.status}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faEdit} onClick={(e) => editToDo(e, d.id)} style={{ color: "green", cursor: "pointer", marginRight: "25px" }} />
                                    </td>
                                </tr>
                            ))
                        }
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Todo