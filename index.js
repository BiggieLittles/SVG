//This function imports the classes from the ./lib from circle ,triangle and square  directory
//
const inquirer = require('inquirer');
const fs = require('fs');
const { Square } = require('./lib/square.js');
const { Circle } = require('./lib/circle.js');
const { Triangle } = require('./lib/triangle.js');



// An array of prompt questions to ask the user input which svg file shape for the logo maker 
        // The user must type 3 characters to create logo
inquirer
        .prompt ([
     
            {
                type: 'input',
                message: 'Enter three characters.',
                name: 'characters',
                validate: text => {
                    if (text) {
                        return true;
                // This write the console log variable if the user does NOT provide a variable to create 3 characters
                    } else {
                        console.log ('Type ONLY up to 3 characters')
                        return false;
                    }
                }
          
            },
            //  The user input must put color keyword to create logo
            {
                type: 'input',
                message: 'Enter a color keyword (OR a hexadecimal number).',
                name: 'textColor',
            
                      validate: color => {
                        if (color) {
                            return true;
              
                         } else {
                        console.log ('Type the text color keyword or hex #');
                        return false;
                        }
                    }

            },
            // The user inputs a shape to create logo
            {
                type: 'list',
                message: 'Choose a shape from the list below.',
                choices: [
                    { name: 'Square', value: 'Square' },
                    { name: 'Circle', value: 'Circle' },
                    { name: 'Triangle', value: 'Triangle' },
                ],
                name: 'shape',
                    validate: image => {
                        if (image) {
                            return true;
              
                         } else {
                        console.log ('Type the text color keyword ');
                        return false;
                        }
                    }
                },
    
               // The user inputs a color keyword of the shape logo
            {
                type: 'input',
                message: 'Enter a shape color keyword (OR a hexadecimal number)',
                name: 'shapeColor',
                validate: shape=> {
                    if (shape) {
                        return true;
              
                     } else {
                    console.log ('Type the shape color keyword or hex #');
                    return false;
                     }
                }
              },
        ])

        // This Function creates the  square circle and triangle elements
        // once user input their logo it redirects to example file
.then((response) => {
    
        if (response.shape === 'Square') {
            const square = new Square(response.characters, response.shapeColor, response.textColor)
            fs.writeFile('./examples/logo.svg', square.render(), (error) => {
                if (error) {
                    console.error(error);
                }
            });
        } else if (response.shape === 'Circle') {
            const circle = new Circle(response.characters, response.shapeColor, response.textColor)
            fs.writeFile('./examples/logo.svg', circle.render(), (error) => {
                if (error) {
                    console.error(error);
                }
            })
        } else {
            const triangle = new Triangle(response.characters, response.shapeColor, response.textColor)
            fs.writeFile('./examples/logo.svg', triangle.render(), (error) => {
                if (error) {
                    console.error(error);
                }
            })
        }
    })
    // init the app once created a console logo that init logo.svg is created 
    .then(() => {
        return console.log("Great job Your Generated logo.svg is created!")
        
    })