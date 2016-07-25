//Definiendo el grafo
//Nodos: (Indice, Nombre)
var number_of_nodes = 8;

var nodes = [(1, 'C'),
             (2, 'E'),
             (3, 'F'),
             (4, 'G'),
             (5, 'H'),
             (6, 'K'),
             (7, 'L'),
             (8, 'N')
            ];

           //  C   E   F   G   H   K   L   N
var weights = [[ 0, 10, 20,  0, 30, 70, 10, 47],  //C
               [10,  0,  0, 40, 60, 10,  5,  0],  //E
               [20,  0,  0, 55,  0,  0, 10, 30],  //F
               [ 0, 40, 55,  0, 80, 90,  0,  0],  //G
               [30, 60,  0, 80,  0, 73, 40,  0],  //H
               [70, 10,  0, 90, 73,  0,  0, 60],  //K
               [10,  5, 10,  0, 40,  0,  0,  0],  //L
               [47,  0, 30,  0,  0, 60,  0,  0]   //N
              ];

//Constructor, inicializa a un costo muy grande
var Cromosoma = function(cr_size, genotype) {
  this.size = cr_size;
  if(genotype)
    this.genotype;
  this.cost = 9999;
};

//Escoge genes aleatorios para el cromosoma
Cromosoma.prototype.random = function() {
  this.genotype = [];
  for(var i = 0; i < this.size; i++) {
    this.genotype[i] = nodes[Math.floor(Math.random() * number_of_nodes)];    
  }
}

//Calcula el costo del cromosoma
Cromosoma.prototype.getCost = function() {
  var sum = 0;
  for(var i = 1; i < this.size; i++) {
    sum += weights[this.genotype[i-1]][i];
  }
}

var Poblacion = function(pb_size, cr_size) {
  //Crea una población Random
  console.log("\nGenerando Población inicial");
  this.population = [];  
  while(pb_size--) {
    var cromosome = new Cromosoma(cr_size);
    cromosome.random();
    this.population.push(cromosome);
  }
};

//Imprime los cromosomas de la población
Poblacion.prototype.print = function() {
  console.log("Vamo' a imprimir");
  console.log(this.population.size == 4);
  for(var i = 0; i < this.population.length; i++) {
    console.log(i + ") Iteration");
  }
};

// var Solver = function(pb_size, cr_size, )

function main() {
  console.log("run:");
  
  //Parámetros de la ejecución
  var pob_size = 4,
      cromosoma_size = 5,
      iterations = 30,
      crossover_prob = 0.9,
      crossover_point = 3,
      mut_prob = 0.05;

  //Outputs
  console.log("Tamaño de la Población: " + pob_size);
  console.log("Tamaño de los Cromosomas: " + cromosoma_size);
  console.log("Cantidad de Iteraciones: " + iterations);
  console.log("Probabilidad de Cruzamiento: " + crossover_prob);
  console.log("Cruzamiento de un Punto - Punto " + crossover_point);
  console.log("Probabilidad de Mutación: " + mut_prob);
  console.log("Mutación Simple"); //Dependerá de otra variable
  
  //Creamos una nueva población
  var poblacion = new Poblacion(pob_size, cromosoma_size);
  poblacion.print;
  
  return poblacion.population;
}

main();