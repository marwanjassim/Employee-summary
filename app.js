// Use an async function to do await here
(async function() {
    const fs = require('fs')
    const template = require('lodash.template')
    const inquirer = require('inquirer')
    const Manager = require('./lib/Manager')
    const Intern = require('./lib/Intern')
    const Engineer = require('./lib/Engineer')

    const mainTemplate = template(fs.readFileSync("templates/main.html", 'utf8'))
    const managerTemplate = template(fs.readFileSync("templates/Manager.html", 'utf8'))
    const internTemplate = template(fs.readFileSync("templates/Intern.html", 'utf8'))
    const engineerTemplate = template(fs.readFileSync("templates/Engineer.html", 'utf8'))

    var answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: "What is the manager's name?"
        },
        {
            type: 'number',
            name: 'managerId',
            message: "What is the manager's ID?"
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: "What is the manager's email?"
        },
        {
            type: 'number',
            name: 'managerOfficeNumber',
            message: "What is the manager's office number?"
        },
        {
            type: 'number',
            name: 'numInterns',
            message: "How many interns are there?"
        },
        {
            type: 'number',
            name: 'numEngineers',
            message: "How many engineers are there?"
        }
    ])

    var employees = []
    var manager = new Manager(
        answers.managerName,
        answers.managerId,
        answers.managerEmail,
        answers.managerOfficeNumber
    )

    employees.push(managerTemplate({
        manager: manager
    }))

    for (var i = 1; i <= answers.numInterns; i++) {
        var internAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: "What is intern " + i + "'s name?"
            },
            {
                type: 'number',
                name: 'internId',
                message: "What is intern " + i + "'s ID?"
            },
            {
                type: 'input',
                name: 'internEmail',
                message: "What is intern " + i + "'s email?"
            },
            {
                type: 'input',
                name: 'internSchool',
                message: "What is intern " + i + "'s school?"
            }
        ])
        var intern = new Intern(
            internAnswers.internName,
            internAnswers.internId,
            internAnswers.internEmail,
            internAnswers.internSchool
        )
        employees.push(internTemplate({
            intern: intern
        }))
    }

    for (var i = 1; i <= answers.numEngineers; i++) {
        var engineerAnswers = await inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: "What is engineer " + i + "'s name?"
            },
            {
                type: 'number',
                name: 'engineerId',
                message: "What is engineer " + i + "'s ID?"
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: "What is engineer " + i + "'s email?"
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: "What is engineer " + i + "'s Github?"
            }
        ])
        var engineer = new Engineer(
            engineerAnswers.engineerName,
            engineerAnswers.engineerId,
            engineerAnswers.engineerEmail,
            engineerAnswers.engineerGithub
        )
        employees.push(engineerTemplate({
            engineer: engineer
        }))
    }

    var outputHTML = mainTemplate({
        employees: employees
    })
    fs.writeFileSync("output/team.html", outputHTML)
})()