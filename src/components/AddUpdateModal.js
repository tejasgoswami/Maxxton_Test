import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Form, FormGroup, Label, Input,Row } from 'reactstrap';
import Helpers from "../Helper/helpers";

const ModalComponent = ({ isAdd, toggle, isOpen, selectedData }) => {

    const [title, setTitle] = useState(isAdd ? "" : selectedData.Title);
    const [description, setDescription] = useState(isAdd ? "" : selectedData.Description);
    const [dueDate, setDueDate] = useState(isAdd ? "" : selectedData.dueDate);
    const [priority, setPriority] = useState(isAdd ? "none" : selectedData.priority);

    const setTodoData = async () => {
        
        const request = {
            Title: title,
            Description: description,
            dueDate: dueDate,
            priority: priority,
            createAt: isAdd ? new Date().toJSON().slice(0, 10).replace(/-/g, '/') : selectedData.CreatedAt,
            CurrentState: isAdd ? "pending" : selectedData.CurrentState
        }
        
        if (title == "" || !title) {
            Helpers.displayNotification("Please enter title", "error");
        } else if (title && (title.length < 10 || title.length > 140)) {
            Helpers.displayNotification("Please enter valid title, length should be 10 to 140 characters", "error");
        } else if (description == "" || !description) {
            Helpers.displayNotification("Please enter description", "error");
        } else if (description && (description.length < 10 || description.length > 500)) {
            Helpers.displayNotification("Please enter valid description, length should be 10 to 500 characters", "error");
        } else {
            let todoList = localStorage.getItem("TodoList");
            let parsedList = todoList ? JSON.parse(todoList) : []
            if (parsedList && parsedList != undefined) {
                parsedList.push(request)
            } else {
                parsedList.push(request)
            }
            await localStorage.setItem("TodoList", JSON.stringify(parsedList));
            toggle(parsedList)
            clearForm()
            Helpers.displayNotification("Task Saved successfully", "success");
        }
    }

    const clearForm = () => {
        setTitle("")
        setDescription("")
        setDueDate("")
        setPriority("")
    }

    const closeBtn = <button className="close" onClick={toggle}>&times;</button>;

    return (
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle} close={closeBtn}>{isAdd ? "Add Task" : "Edit Task"}</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row className="m-0">
                        <Label for="summary">Title</Label>
                        <Input type="text" name="summary"
                            onChange={(e) => { setTitle(e.target.value) }} 
                            value={title} id="summary" placeholder="Enter title" />
                    </FormGroup>
                    <FormGroup row className="m-0">
                        <Label for="Description">Description</Label>
                        <Input type="textarea" onChange={(e) => { setDescription(e.target.value) }} value={description} name="Description" id="Description" />
                    </FormGroup>
                    <Row className="m-0">
                        <Col md={6}>
                            <FormGroup>
                                <Label for="DueDate" sm={2}>DueDate</Label>
                                <Input type="date"
                                    onChange={(e) => { setDueDate(e.target.value) }}
                                    value={dueDate}
                                    name="DueDate" id="DueDate" />
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                            <FormGroup>
                                <Label for="groupBY">Priority</Label>
                                <Input type="select" onChange={(e) => {
                                    setPriority(e.target.value)
                                }} name="select" id="groupBY">
                                    <option value="none">None</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Cancel</Button>{' '}
                <Button color="success" onClick={setTodoData}>Save</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalComponent;