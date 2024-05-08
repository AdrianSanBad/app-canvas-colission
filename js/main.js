const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;
//Asigna las dimensiones del canvas a las dimensiones de la pantalla
canvas.height = window_height;
canvas.width = window_width;
//Asigna un color de fondo al canvas
canvas.style.background = "#ff8";
//se crea la clase Circle
class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        //hacemos que el movimiento inicial sea aleatorio en x y en y 
        this.dx = (Math.random() < 0.5 ? -1 : 1) * this.speed;
        this.dy = (Math.random() < 0.5 ? -1 : 1) * this.speed;
    }

    // Método para dibujar el círculo en el lienzo
    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    // Método para actualizar la posición del círculo
    update(context) {
        this.draw(context);

        if ((this.posX + this.radius) > window_width) {
            this.dx = -this.dx;
        }

        if ((this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        if ((this.posY + this.radius) > window_height) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

// Función para calcular la distancia entre dos puntos
function getDistance(x1, x2, y1, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

// Crear un arreglo de círculos con posiciones y propiedades aleatorias
let circles = [];
for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * (window_width - 100) + 50;
    let randomY = Math.random() * (window_height - 100) + 50;
    let randomRadius = 25;
    let randomSpeed = 2;
    circles.push(new Circle(randomX, randomY, randomRadius, "blue", (i + 1).toString(), randomSpeed));
}

// Dibujar todos los círculos en el lienzo
circles.forEach(circle => circle.draw(ctx));

// Función para actualizar continuamente la animación de los círculos
let updateCircles = function () {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach(circle => circle.update(ctx));

    // Comprobar colisiones entre círculos y cambiar sus direcciones y colores si es necesario
    for (let i = 0; i < circles.length; i++) {
        for (let j = i + 1; j < circles.length; j++) {
            if (getDistance(circles[i].posX, circles[j].posX, circles[i].posY, circles[j].posY) < circles[i].radius + circles[j].radius) {
                circles[i].dx = -circles[i].dx;
                circles[i].dy = circles[i].dy;
                circles[j].dx = -circles[j].dx;
                circles[j].dy = circles[j].dy;
                circles[i].color = "red";
                circles[j].color = "red";
            } else {
                circles[i].color = "blue";
                circles[j].color = "blue";
            }
        }
    }
};

updateCircles();
