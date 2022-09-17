import { useState } from "react";
import { Container, Card, Table } from "react-bootstrap";
import { BsTrash } from 'react-icons/bs';
import { FaEdit, FaUndo } from 'react-icons/fa';
import { GrAdd,GrDocumentUpdate } from 'react-icons/gr';
import { MdOutlineDoneAll } from 'react-icons/md';
import DeleteConfirmation from "./Modal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { v4 as uuid } from 'uuid';
import "./app.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // Set up a list of fruits and vegetables
  const [allTask, setAllTask] = useState([{
    id: uuid(),
    name: "Learn React",
    isCompleted: false
  },
  {
    id: uuid(),
    name: "Learn Node",
    isCompleted: false
  },
  {
    id: uuid(),
    name: "Learn Express",
    isCompleted: false
  },
  ]);

  // Set up some additional local state
  const [id, setId] = useState(null);
  const [updateMode, setUpdateMode] = useState(false);
  const [task, setTask] = useState('');
  const [updateTask, setUpdateTask] = useState({});
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = (id) => {
    setAllTask(allTask.filter((task) => task.id !== id));
    setDisplayConfirmationModal(false);
  };
  const addTask = () => {
    setAllTask([...allTask, { id: uuid(), name: task, isCompleted: false }]);
    setTask('');
  }
  const markAsDone = (id) => {
    setAllTask(allTask.map((task) => task.id === id ? { ...task, isCompleted: true } : task));
  }
  const markAsUndo = (id) => {
    setAllTask(allTask.map((task) => task.id === id ? { ...task, isCompleted: false } : task));
  }
  const editTask = (id) => {
    setId (id);
    allTask.map((task) => {
      if (task.id === id) {
        setUpdateTask(task);
      }
      return task;
    });
    setUpdateMode(true);
  }
  const handelUpdateTask = () => {
    allTask.map((task) => {
      if (task.id === id) {
        task.name = updateTask.name;
      }
      return task;
    });
    setUpdateMode(false);
    setTask('');
  }
  return (
    <Container className="mt-4 mb-4">
      <h1 className="text-center">ToDo List</h1>
      <div className="container">
        {updateMode ? (
        <div className="row addNew">
          <div className="col-md-2" style={{ backgroundColor: "aqua" }}>
            <label>Update Task</label>
          </div>
          <div className="col-md-9">
            <input type="text" value={updateTask.name} onChange={(e) => { setUpdateTask({name:e.target.value}) }} placeholder="Click Here to write" />
          </div>
          <div className="col-md-1" style={{ backgroundColor: "yellow" }}>
            <div className="button2" onClick={() => { handelUpdateTask() }}> <GrDocumentUpdate/> Update</div>
          </div>
        </div>
        ):(
        <div className="row addNew">
          <div className="col-md-2" style={{ backgroundColor: "aqua" }}>
            <label>Add a New Task</label>
          </div>
          <div className="col-md-9">
            <input type="text" value={task} onChange={(e) => { setTask(e.target.value) }} placeholder="Click Here to write" />
          </div>
          <div className="col-md-1" style={{ backgroundColor: "yellow" }}>
            <div className="button" onClick={() => { addTask() }}> <GrAdd /> Add</div>
          </div>
        </div>
        )}
        
      </div>
      <Card className="mt-2">
        <Card.Header><div className="h4 text-center">All Tasks</div></Card.Header>
        <Card.Body>
          <Table striped bordered size="sm">
            <thead>
              <tr>
                <th className="text-center" style={{ width: "80px" }}>Sr.</th>
                <th>Task</th>
                <th className="text-center" style={{ width: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allTask.map((task, index) => {
                return (
                  <tr className={task.isCompleted ? "done" : ""} key={task.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{task.name} {task.isCompleted && <span style={{ marginLeft: "100px" }} className="fw-bold">Completed</span>}</td>
                    <td className='text-center actions'>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Delete This Task
                          </Tooltip>
                        }>
                        <span> <BsTrash className="text-danger cursor" size={25} onClick={() => showDeleteModal(task.id)} /></span>
                      </OverlayTrigger>

                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-top`}>
                            Edit This Task
                          </Tooltip>
                        }>
                        <span> <FaEdit className="text-primary cursor" size={25} onClick={() => editTask(task.id)} /></span>
                      </OverlayTrigger>
                      {!task.isCompleted ? (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              Mark as Done
                            </Tooltip>
                          }>
                          <span> <MdOutlineDoneAll className="text-warning cursor" size={25} onClick={() => markAsDone(task.id)} /></span>
                        </OverlayTrigger>
                      ) : (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-top`}>
                              Mark as Un Do
                            </Tooltip>
                          }>
                          <span> <FaUndo className="text-warning cursor" size={20} onClick={() => markAsUndo(task.id)} /></span>
                        </OverlayTrigger>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} />
    </Container>
  );
};

export default App;