import React, { useState } from "react";
import { Box, VStack, Heading, Input, Button, List, ListItem, ListIcon, IconButton, useToast, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaPlus, FaCheckCircle, FaCircle, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const toast = useToast();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (!inputValue.trim()) {
      toast({
        title: "No task entered.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: inputValue, isCompleted: false }]);
    setInputValue("");
  };

  const handleCompleteTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, isCompleted: !task.isCompleted } : task)));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.isCompleted;
    }
    if (filter === "completed") {
      return task.isCompleted;
    }
    return true; // all tasks
  });

  return (
    <Box p={8}>
      <VStack spacing={8}>
        <Heading>To-Do List</Heading>
        <InputGroup>
          <Input placeholder="Add a new task..." value={inputValue} onChange={handleInputChange} />
          <InputRightElement>
            <IconButton icon={<FaPlus />} onClick={handleAddTask} />
          </InputRightElement>
        </InputGroup>
        <Box w="100%">
          <Button mr={2} onClick={() => handleFilterChange("all")}>
            All
          </Button>
          <Button mr={2} onClick={() => handleFilterChange("active")}>
            Active
          </Button>
          <Button onClick={() => handleFilterChange("completed")}>Completed</Button>
        </Box>
        <List w="100%">
          {filteredTasks.map((task) => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
              <ListIcon as={task.isCompleted ? FaCheckCircle : FaCircle} color={task.isCompleted ? "green.500" : "gray.500"} onClick={() => handleCompleteTask(task.id)} cursor="pointer" />
              <Box flex="1">{task.text}</Box>
              <IconButton icon={<FaEdit />} mr={2} />
              <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default Index;
