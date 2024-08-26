#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList : string [] = [];
let conditions = true;
let main = async () => {
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.bgBlue("Select an option you want to do: "),
                choices: ["Add task" , "Delete task" , "Update task" , "View Todo-List" , "Exit"]
            }
        ]);
        if(option.choice === "Add task"){
            await addTask()
        }
        else if(option.choice === "Delete task"){
            await deleteTask()
        }
        else if(option.choice === "Update task"){
            await updateTask()
        }
        else if(option.choice === "View Todo-List"){
            await viewTask()
        }
        else if(option.choice === "Exit"){
            conditions = false;
        }
    }
} 
// add new task
let addTask = async () => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.green("Enter your new task:"),
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.italic.blue(`\n ${newTask.task} task added successfully in todo-List\n`))
}
//view
let viewTask = () => {
    console.log(chalk.italic.magenta("\n Your todo-list: \n"));
    todoList.forEach(( task, index) => {
        console.log(`${index + 1}: ${task}`)
    })
}
// delete task
let deleteTask = async () => {
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.italic.yellow(" Enter the 'index no' of the task you want to delete:"),
        }
    ]);
    let deleteTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.italic.blue(`\n ${deleteTask} This task has been deleted successfully from your todo-list`))
}
// update task
let updateTask = async () => {
    await viewTask()
    let uptateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type:"number",
            message:chalk.italic.magenta("Enter the index number of task you want to update: ")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.italic.green("Now enter yor new task: ")
        }
    ]);
    todoList[uptateTaskIndex.index - 1] = uptateTaskIndex.new_task
    console.log(chalk.italic.gray(`\n Task at index no. ${uptateTaskIndex.index - 1} updated successfully [for updated list check "view todo-list"]`))

}
main();