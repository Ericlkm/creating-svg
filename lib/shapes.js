class Shapes{
    constructor(){
        this.color = ""
    }
    setColor(color){
     this.color = (color);
    }
}

class Circle extends Shapes{
    render(){
        return `  <circle cx="150" cy="120" r="80" fill="${this.color}" />`
    }
}

class Square extends Shapes{
    render(){
        return `<rect x="50" y="50"  width="200" height="200" fill="${this.color}" />`
    }
}

class Triangle extends Shapes{
    render(){
        return `<polygon points="130 0, 1000 1000, 10 200" fill="${this.color}"/>
        `
    }
}

module.exports = { Circle, Square, Triangle}