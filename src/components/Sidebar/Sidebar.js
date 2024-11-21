import React, { useState, useEffect, useContext } from 'react';
import { MessageContext } from '../../context';
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Modal, List, message } from 'antd';
import axios from 'axios';
import moment from "moment"
import toast from 'react-hot-toast';
import { Select } from "antd"
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import "./Sidebar.css"

const { Option } = Select



const Sidebar = () => {
    const [isvisible, setIsvisible] = useState(false)
    const [task, setTask] = useState('')
    const [selected, setSelected] = useState(null)
    const [name, setName] = useState('')
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")
    const [updatedName, setUpdatedName] = useState("")
    const [updateTask, setUpdateTask] = useState("")
    const [updatedMessage, setUpdatedMessage] = useState("")
    const [list, setList] = useState([])
    const [updateIsvisible, setUpdateIsvisible] = useState(false)
    const { setMessageContent } = useContext(MessageContext);

    const handlerSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`https://backendtaskmanger.onrender.com/api/v1/task/addtask`, { task, name, message, email })
            if (data?.success) {
                toast.success('Task is Created Successfully...')
                getAllTasks()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error('Somthing Went wrong....')
        }
    }


    const getAllTasks = async () => {
        try {
            const { data } = await axios.get(`https://backendtaskmanger.onrender.com/api/v1/task/getalltasks/${email}`)
            if (data && data.success) {
                setList(data)
            }
        } catch (error) {
            toast.error('Error in While fetching Tasks')
        }
    }

    const getMail = () => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            const parsedAuth = JSON.parse(authData); // Parse the JSON string
            setEmail(parsedAuth.user.email); // Access the nested email
        }
    }

    useEffect(() => {
        getAllTasks()
        getMail()
    }, [])

    // handle Update

    const handleUpdateForm = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`https://backendtaskmanger.onrender.com/api/v1/task/updatetask/${selected._id}`, { task: updateTask, name: updatedName, message: updatedMessage })
            if (data && data.success) {
                getAllTasks()
            }
        } catch (error) {
            toast.error('Error in Upadating Tasks')
        }
    }


    //handle Delete

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`https://backendtaskmanger.onrender.com/api/v1/task/deletetask/${id}`)
            if (data && data.success) {
                toast.success('Deleted Successfully')
                getAllTasks()
            }

        } catch (error) {
            toast.error('Error in Deleting Tasks')
        }
    }

    const handleClickViewMessage = async (id) => {
        try {
            const { data } = await axios.get(`https://backendtaskmanger.onrender.com/api/v1/task/getsingletask/${id}`);
            if (data && data.success) {
                setMessageContent(data.tasks.message);
            }
        } catch (error) {
            toast.error('Error in fetching Tasks');
        }
    }

    return (
        <div className='personMainContainer' style={{ width: "30vw", height: "93vh", backgroundColor: '#FFF' }}  >
            <div className="card-body cardBody"  >
                <div className="list-group">
                    {list.task?.map(c => (

                        <li key={c._id} onClick={() => handleClickViewMessage(c._id)}  >
                            <a
                                className="list-group-item list-group-item-action "
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{c.task}</h5>
                                    <small className='' style={{ fontSize: '10px', color: '#ac39ac' }} > <MdOutlineDeleteOutline size={20} className=' text-danger' onClick={() => handleDelete(c._id)} /> <CiEdit size={20} onClick={() => { setUpdateIsvisible(true); setUpdatedName(c.name); setUpdateTask(c.task); setSelected(c) }} className='me-1 text-primary' /> {moment(c?.createAt).fromNow()}</small>
                                </div>
                                <div className='d-flex justify-content-between '  >
                                    <p className="mb-1" style={{ fontSize: '15px', fontFamily: 'Roboto', marginTop: '10px' }} >Assigned to : {c?.name}</p>

                                </div>
                            </a>
                        </li>
                    ))}
                </div>
            </div>
            <div className="card-footer text-body-secondary" style={{ backgroundColor: 'transparent', border: 'none' }}  >
                <BsFillPlusCircleFill className='addBtn' size={60} onClick={() => setIsvisible(true)} style={{ color: "#ff4d94", backgroundColor: 'ffcc66', borderRadius: '50%', border: 'none' }} />
            </div>
            <Modal open={isvisible} footer={null} onCancel={() => setIsvisible(false)}>
                <form onSubmit={handlerSubmit} className='formBox text-center p-3'   >
                    <div className="mb-3 w-100 d-flex flex-column justify-content-center align-items-center  ">
                        <input type="text" value={task} onChange={e => setTask(e.target.value)} className="form-control w-60 mb-3 " placeholder='Enter new task' />
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className="form-control w-60 mb-3 " placeholder='Enter new Name' />
                        <input type="text" value={message} onChange={e => setMessage(e.target.value)} className="form-control w-60 " placeholder='Enter new Message' />
                    </div>
                    <button type="submit" onClick={() => setIsvisible(false)} className="btn btn-primary  ">Submit</button>
                </form>
            </Modal>
            <Modal open={updateIsvisible} footer={null} onCancel={() => setUpdateIsvisible(false)} >
                <form onSubmit={handleUpdateForm} className='formBox text-center p-3' >
                    <div className="mb-3 w-100 d-flex flex-column justify-content-center align-items-center "    >
                        <input type="text" value={updateTask} onChange={e => setUpdateTask(e.target.value)} className="form-control w-60 mb-3 " placeholder='Enter new task' />
                        <input type="text" value={updatedName} onChange={e => setUpdatedName(e.target.value)} className="form-control w-60 mb-3 " placeholder='Enter new Name' />
                        <input type="text" value={updatedMessage} onChange={e => setUpdatedMessage(e.target.value)} className="form-control w-60 " placeholder='Enter new Message' />
                    </div>
                    <button type="submit" onClick={() => setUpdateIsvisible(false)} className="btn btn-primary">Submit</button>
                </form>
            </Modal>
        </div>
    )
}

export default Sidebar