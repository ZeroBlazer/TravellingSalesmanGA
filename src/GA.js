//Definiendo el grafo

var number_of_nodes = 8;
var inf=99999

//Nodos: (Indice, Nombre)
var nodes = [(1, 'C'),
             (2, 'E'),
             (3, 'F'),
             (4, 'G'),
             (5, 'H'),
             (6, 'K'),
             (7, 'L'),
             (8, 'N')
            ];


function transform(letra){
  if (letra == 'C')
    return 0;
  else if (letra == 'E')
    return  1;
  else if (letra =='F')
    return 2;
  else if (letra =='G')
    return 3;
  else if (letra =='H')
    return 4;
  else if (letra =='K')
    return 5;
  else if (letra =='L')
    return 6;
  else if (letra =='N')
    return 7;

}

              //  C   E   F   G   H   K   L   N
var weights = [[inf,  10,  20, inf,  30,  70,  10,  47],  //C
               [ 10, inf, inf,  40,  60,  10,   5, inf],  //E
               [ 20, inf, inf,  55, inf, inf,  10,  30],  //F
               [inf,  40,  55, inf,  80,  90, inf, inf],  //G
               [ 30,  60, inf,  80, inf,  73,  40, inf],  //H
               [ 70,  10, inf,  90,  73, inf, inf,  60],  //K
               [ 10,   5,  10, inf,  40, inf, inf, inf],  //L
               [ 47, inf,  30, inf, inf,  60, inf, inf]   //N
              ];

//Constructor, inicializa a un costo muy grande
var Cromosoma = function(cr_size, genotype) {
  this.size = cr_size;
  if(genotype)
    this.genotype;
  this.cost = 9999; //Se crea el objeto con un costo muy grande
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
    sum += weights[transform(this.genotype[i-1])][transform(this.genotype[i])];
    //console.log(sum);
  }
  this.cost=sum;
}

var Poblacion = function(pb_size, cr_size) {
  //Crea una población Random
  console.log("\nGenerando Población inicial");
  this.population = [];  
  while(pb_size--) {
    var cromosome = new Cromosoma(cr_size);
    cromosome.random();
    cromosome.getCost();
    //console.log(cromosome.genotype);
    //console.log(cromosome.cost);
    this.population.push(cromosome);
  }
};

//Imprime los cromosomas de la población
Poblacion.prototype.print = function() {
  for(var i = 0; i < this.population.length; i++) {
    c_gen = '';
    c_cost= '';
    for(var j = 0; j < this.population[i].size; j++){
      c_gen += this.population[i].genotype[j];
    }
    c_cost= this.population[i].cost;
    console.log(i + 1 + ") " + c_gen+" = "+c_cost); 
  }
  
}


//Funcion ruleta
Poblacion.prototype.ruleta = function(){
  var sum_ruleta = 0;
  ruleta_vect = [];

    for(var i=0;i<this.population.length;i++){
    sum_ruleta +=this.population[i].cost; //sumamos todos los pesos
  }

  for(var i=0;i<this.population.length;i++){
    ruleta_vect.push(this.population[i].cost*100/sum_ruleta); //llenamos sus vec
}
  for(var i = 0; i < this.population.length; i++) {
    c_gen = '';
    c_cost= '';
    for(var j = 0; j < this.population[i].size; j++){
      c_gen += this.population[i].genotype[j];
    }
    c_cost= this.population[i].cost;
    console.log(i + 1 + ") " + c_gen+" = "+c_cost+" -- "+ruleta_vect[i]); 
  }


}





var Solver = function(pb_size, cr_size, iterations, crossover_prob, crossover_point, mut_prob) {
  //Creamos una nueva población
  var poblacion = new Poblacion(pb_size, cr_size);
  poblacion.print();
  poblacion.ruleta();
  
  //Copiamos los parámetros útiles
  this.iterations = iterations;
};

Solver.prototype.evolve = function() {
  for(var i = 0; i < this.iterations; i++) {
    console.log("\n\nIteración: " + i);
  }
}

function main() {
  console.log("run:");
  
  //Parámetros de la ejecución
  var pob_size = 4,
      //cromosoma_size = 5,
      cromosoma_size = 8,
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
  
  var solver = new Solver(pob_size, cromosoma_size, iterations, crossover_prob, crossover_point, mut_prob);
  //solver.evolve();
  
}

main();

//node GA.js