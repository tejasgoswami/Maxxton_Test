import React, { useState, useEffect } from "react";
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form, FormGroup } from 'reactstrap';

import ModalComponent from "./AddUpdateModal";

const TodoDetails = ({ type, searchValue }) => {
    const [selectedData, setSelectedData] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [modal, setModal] = useState(false);
    const [parsedList, setParsedList] = useState([]);
    const [deleteModal, setDeletedModal] = useState(false);
    const [arrow, setArrowTable] = useState("fa fa-caret-down")
    const [sort, setSort] = useState({
        column: null,
        direction: "desc",
      })
    
    useEffect(() => {
    let todoList = localStorage.getItem("TodoList");
    let parsed = todoList ? JSON.parse(todoList) : []
    setParsedList(parsed)
    },[modal, deleteModal])
    
    let renderItems = [];
    let searchedData = []
    if(searchValue != ""){
        if (parsedList && parsedList.length) {
            parsedList.map((value, key) => {
                if (searchValue && (value.Title.includes(searchValue) ||
                value.priority.includes(searchValue) ||
                value.createAt.includes(searchValue) ||
                value.dueDate.includes(searchValue)
                ))
                 {
                    searchedData.push(value);
                }
            })
        }

        if (searchedData && searchedData.length) {
            searchedData.map((value, key) => {
                if (type === "all") {
                    renderItems.push(value);
                } else if (type == "pending" && value.CurrentState == "pending") {
                    renderItems.push(value);
                } else if (type == "completed" && value.CurrentState == "completed") {
                    renderItems.push(value);
                }
            })
        }

    } else{
        if (parsedList && parsedList.length) {
            parsedList.map((value, key) => {
                if (type === "all") {
                    renderItems.push(value);
                } else if (type == "pending" && value.CurrentState == "pending") {
                    renderItems.push(value);
                } else if (type == "completed" && value.CurrentState == "completed") {
                    renderItems.push(value);
                }
            })
        }
    }

    const completed = (index) => {
        renderItems[index].CurrentState = "completed";
        localStorage.setItem("TodoList", JSON.stringify(renderItems))
        setParsedList(parsedList)
    }

    const reopen = (index) => {
        renderItems[index].CurrentState = "pending";
        localStorage.setItem("TodoList", JSON.stringify(renderItems))
        setParsedList(parsedList)
    }

    const edit = (index) => {
        setSelectedData(renderItems[index])
        setModal(true)
    }

    const deleteTask = (index) => {
        setSelectedIndex(index)
        setDeletedModal(true)
    }

    const toggle = (e, parsedList) => {
        setModal(!modal)
        if(parsedList){
            setParsedList(parsedList)
        }
    };

    const toggleDelete = () => setDeletedModal(!deleteModal);

    const deleteSelectedTask = () => {
        renderItems.splice(selectedIndex,1);
        localStorage.setItem("TodoList", JSON.stringify(renderItems))
        setSelectedIndex("")
        toggleDelete()        
    }

   const onSort = (column) => () => {
    const direction = sort.column ? (sort.direction === "asc" ? "desc" : "asc") : "desc";
    const sortedData = renderItems.sort((a, b) => {
      if (column) {
        const nameA = a[column]
        const nameB = b[column]
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      return a.Title - b.Title;
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    setParsedList(sortedData)
    setSort({
        column,
        direction,
      })
    };

    const setArrow = (column) => {
        let className = "fa fa-caret-down pl-2";

        if (sort.column === column) {
            className += sort.direction === " fa fa-caret-down pl-2" ? " fa fa-caret-down pl-2" :
             " fa fa-caret-up pl-2";
        }
        // setArrowTable(className)
        return className
      };

    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th onClick={onSort("Title")} className="curser-pointer">
                            Summary
                        <span className={setArrow("Title")} />
                        </th>
                        <th onClick={onSort("priority")} className="curser-pointer">
                            Priority
                        <span className={setArrow("priority")} />
                        </th>
                        <th onClick={onSort("createdAt")} className="curser-pointer">
                            Created On
                        <span className={setArrow("createdAt")} />
                        </th>
                        <th onClick={onSort("dueDate")} className="curser-pointer">
                            Due By
                        <span className={setArrow("dueDate")} />
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems && renderItems.length ? renderItems.map((value, key) => {
                        return (
                            <tr key={key}>
                                <td style={value.CurrentState == "completed" ? {textDecoration : "line-through"} : {}}>{value.Title ? value.Title: "-"}</td>
                                <td style={value.CurrentState == "completed" ? {textDecoration : "line-through"} : {}}>{value.priority ? value.priority : "-"}</td>
                                <td style={value.CurrentState == "completed" ? {textDecoration : "line-through"} : {}}>{value.createAt ? value.createAt : "-"}</td>
                                <td style={value.CurrentState == "completed" ? {textDecoration : "line-through"} : {}}>{value.dueDate ? value.dueDate : "-" }</td>
                                <td>
                                    <Button color="primary" className="m-1" onClick={() => { edit(key) }}><i className="fa fa-edit" /></Button>
                                    {
                                        value.CurrentState == "completed" ? 
                                        <Button color="success" className="m-1" onClick={() => { reopen(key) }}>re-open</Button>
                                        :
                                        <Button color="success" className="m-1" onClick={() => { completed(key) }}>Done</Button>
                                    }
                                    <Button color="danger" className="m-1" onClick={() => { deleteTask(key) }}><i className="fa fa-trash" /></Button>
                                </td>
                            </tr>
                        )
                    }) :
                        (
                            <tr>
                                <td colSpan="4">Data Not Available</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <Modal isOpen={deleteModal} toggle={toggleDelete} >
            <ModalHeader>Delete Task</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row className="m-0">
                        <span>Do you want to delete this task?</span>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleDelete}>No</Button>{' '}
                <Button color="danger" onClick={deleteSelectedTask}>Yes</Button>
            </ModalFooter>
            </Modal>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalComponent isOpen={modal} toggle={toggle} isAdd={false} selectedData={selectedData} />
            </Modal>
        </>
    )
}

export default TodoDetails;