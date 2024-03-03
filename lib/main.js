const inquirer = require("inquirer");
const fs = require("fs");
const { Circle, Square, Triangle } = require("./shapes");

class Create {
  create() {
    return inquirer
      .prompt([
        {
          type: "list",
          name: "shape",
          message: "choose logo shape!",
          choices: ["circle", "square", "triangle"],
        },

        {
          type: "input",
          name: "shapeColor",
          message: "what color would you like your shape to be?",
        },

        {
          type: "input",
          name: "text",
          message: "write text in shape must only conatiner (4) characters!",
        },

        {
          type: "input",
          name: "textColor",
          message: "what color would you like your text to be?",
        },
      ])

      .then(({ shape, shapeColor, text, textColor }) => {
        let shapeType;
        switch (shape) {
          case "circle":
            shapeType = new Circle();
            break;
          case "square":
            shapeType = new Square();
            break;
          case "triangle":
            shapeType = new Triangle();
            break;
          default:
            console.log("Error");
            break;
        }

        shapeType.setColor(shapeColor);

        class SVG {
          constructor() {
            this.textEl = "";
            this.shapeEl = "";
          }

          render() {
            return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shapeEl} ${this.textEl}</svg>`;
          }

          setText(msg, color) {
            if (msg.length > 4) {
              throw new Error("cannot be passed (4) characters!");
            }
            this.textEl = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${msg}</text>`;
          }

          setShape(shape) {
            this.shapeEl = shape.render();
          }
        }

        const svg = new SVG();
        svg.setText(text, textColor);
        svg.setShape(shapeType);
        return fs.writeFile("logo.svg", svg.render(), (err) => {
          if (err) throw err;
          console.log("good!");
        });
      })

      .then(() => {
        console.log(`svg Logo created!`);
      });
  }
}

module.exports = Create;
