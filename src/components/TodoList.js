import React, { useState } from "react";
import classnames from 'classnames';
import TodoDetails from "./TodoDetails";
import {
    FormGroup,
    Label,
    Input,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Row,
    Col
} from 'reactstrap';

const TodoApp = () => {
    const [searchValue, setSearchValue] = useState("")
    const [activeTab, setActiveTab] = useState('all');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <>
            <div className="row mt-10">
                <div className="col-md-4">
                    <FormGroup>
                        <Label for="groupBY">Group By</Label>
                        <Input type="select" name="select" id="groupBY">
                            <option>None</option>
                            <option>Created On</option>
                            <option>Pending On</option>
                            <option>Priority</option>
                        </Input>
                    </FormGroup>
                </div>
                <div className="col-md-8">
                    <FormGroup>
                        <Label for="search">Search</Label>
                        <Input type="text" 
                        name="search" id="search" 
                        placeholder="Search Tasks" 
                        value={searchValue}
                        onChange={(e) => {setSearchValue(e.target.value)}}
                        />
                    </FormGroup>
                </div>
            </div>

            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 'all' })}
                            onClick={() => { toggle('all'); }}
                        >
                            All
                </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 'pending' })}
                            onClick={() => { toggle('pending'); }}
                        >
                            Pending
                </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === 'completed' })}
                            onClick={() => { toggle('completed'); }}
                        >
                            Completed
                </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="all">
                        <Row>
                            <Col sm="12">
                                <TodoDetails type="all" searchValue={searchValue} />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="pending">
                        <Row>
                            <Col sm="12">
                                <TodoDetails type="pending" searchValue={searchValue} />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="completed">
                        <Row>
                            <Col sm="12">
                                <TodoDetails type="completed" searchValue={searchValue} />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </>
    )
}

export default TodoApp;