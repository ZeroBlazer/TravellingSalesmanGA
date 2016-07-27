//Variables útiles
var number_of_nodes = 8;
var inf=99999

//Nodos: (Indice, Nombre)
// var nodes = [(1, 'C'),
//              (2, 'E'),
//              (3, 'F'),
//              (4, 'G'),
//              (5, 'H'),
//              (6, 'K'),
//              (7, 'L'),
//              (8, 'N')
//             ];

var nodes = ['C',
             'E',
             'F',
             'G',
             'H',
             'K',
             'L',
             'N'
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

//                                      Pesos del grafo
//                C    E    F    G    H    K    L    N
var weights = [[inf,  10,  20, inf,  30,  70,  10,  47],  //C
               [ 10, inf, inf,  40,  60,  10,   5, inf],  //E
               [ 20, inf, inf,  55, inf, inf,  10,  30],  //F
               [inf,  40,  55, inf,  80,  90, inf, inf],  //G
               [ 30,  60, inf,  80, inf,  73,  40, inf],  //H
               [ 70,  10, inf,  90,  73, inf, inf,  60],  //K
               [ 10,   5,  10, inf,  40, inf, inf, inf],  //L
               [ 47, inf,  30, inf, inf,  60, inf, inf]   //N
              ];

//CLASE CROMOSOMA-------------------------------------------------------------------->
//Constructor, inicializa a un costo muy grande
var Cromosoma = function(cr_size, genotype) {
  this.size = cr_size;
  if(genotype)
    this.genotype = genotype;
  this.cost = inf; //Se crea el objeto con un costo muy grande
};

//Escoge genes aleatorios para el cromosoma
Cromosoma.prototype.random = function() {
  this.genotype = [];
  for(var i = 0; i < this.size; i++) {
    this.genotype[i] = nodes[Math.floor(Math.random() * number_of_nodes)];    
  }
}

//De acuerdo a la probabilidad muta un gen en el cromosoma
Cromosoma.prototype.mutate = function() {
  //La mutación
  var mut_pos = Math.floor(Math.random() * this.genotype.length);
  this.genotype[mut_pos] = nodes[Math.floor(Math.random() * number_of_nodes)];
  //Imprimir el genotipo
  c_gen = '';
  for(var j = 0; j < this.size; j++)
    c_gen += this.genotype[j];
  console.log(c_gen);
}

//Cruzamiento de dos Cromosomas
Cromosoma.prototype.crossover = function(parent2, crosspoint) {
  if(crosspoint > this.genotype.length) { //Si el crosspoint supera al tamaño del genotipo
    console.log("Not a valid crosspoint");
    return;
  }
  
  //Creamos los genotipos de los hijos
  var genotype_child1 = [],
      genotype_child2 = [];
  for(var i = 0; i < this.genotype.length; i++) {
    genotype_child1[i] = i < crosspoint ? this.genotype[i] : parent2.genotype[i];
    genotype_child2[i] = i < crosspoint ? parent2.genotype[i] : this.genotype[i];
  }
  
  //Imprime los genotipos de los hijos
  var c1_gen = '',
      c2_gen = '';
  for(var j = 0; j < this.genotype.length; j++) {
    c1_gen += genotype_child1[j];
    c2_gen += genotype_child2[j];
  }
  console.log(c1_gen);
  console.log(c2_gen);
  
  return [genotype_child1, genotype_child2];
}

//Calcula el costo del cromosoma
Cromosoma.prototype.getCost = function() {
  var sum = 0;
  for(var i = 1; i < this.size; i++) {
    sum += weights[transform(this.genotype[i-1])][transform(this.genotype[i])];
    //console.log(sum);
  }
  this.cost = sum;
  return this.cost;
}

//CLASE POBLACIÓN-------------------------------------------------------------------->
var Poblacion = function(pb_size, cr_size) {
  //Crea una población Random
  console.log("\nGenerando Población inicial");
  this.population = [];  
  while(pb_size--) {
    var cromosome = new Cromosoma(cr_size);
    cromosome.random();
    cromosome.getCost();
    //console.log(cromosome.cost);
    this.population.push(cromosome);
  }
  
  //Imprime los cromosomas de la población inicial
  for(var i = 0; i < this.population.length; i++) {
    c_gen = '';
    for(var j = 0; j < this.population[i].size; j++)
      c_gen += this.population[i].genotype[j];
    console.log(i + 1 + ") " + c_gen); 
  }
  
  //Guardamos el tamaño del cromosoma para referencia
  this.cr_size = cr_size;
};

//Evalúa e imprime el fitness de cada individuo en la población
Poblacion.prototype.eval = function() {
  console.log("Evaluando Individuos");
  for(var i = 0; i < this.population.length; i++) {
    c_gen = '';
    for(var j = 0; j < this.population[i].size; j++){
      c_gen += this.population[i].genotype[j];
    }
    console.log(i + 1 + ") " + c_gen + " - " + this.population[i].getCost()); 
  }
}

//Funcion ruleta
Poblacion.prototype.ruleta = function(crossover_prob, crossover_point) {
  console.log("Selección de Individuos - Método de la Ruleta");
  var sum_ruleta = 0;
  ruleta_vect = [];

  for(var i=0;i<this.population.length;i++) {
    sum_ruleta +=this.population[i].cost; //sumamos todos los pesos
  }

  for(var i=0;i<this.population.length;i++) {
    ruleta_vect.push(this.population[i].cost * 100 / sum_ruleta); //llenamos sus vec
  }
  
  //Imprime la población y sus valores en la ruleta
  for(var i = 0; i < this.population.length; i++) {
    c_gen = '';
    for(var j = 0; j < this.population[i].size; j++){
      c_gen += this.population[i].genotype[j];
    }
    console.log(i + 1 + ") " + c_gen+" - " + this.population[i].cost + " -- " + ruleta_vect[i]); 
  }
  
  //Seleccionamos a los padres
  var parent1_indx = Math.floor(Math.random() * this.population.length), //Deben ser seleccionados por la ruleta
      parent2_indx = Math.floor(Math.random() * this.population.length);
  console.log("Padre: " + (parent1_indx + 1));
  console.log("Madre: " + (parent2_indx + 1));
  console.log("Cruzamiento");
  //Cruzamiento de los padres
  var children = this.population[parent1_indx].crossover(this.population[parent2_indx], crossover_point),
      child1 = new Cromosoma(this.cr_size, children[0]),
      child2 = new Cromosoma(this.cr_size, children[1]);
  //Insertamos a los hijos a la población
  this.population.push(child1);
  this.population.push(child2);
}

//Muta a los individuos de acuerdo a la probabilidad de alcanzarlos
Poblacion.prototype.mutate = function(chance) {
  for(var i = 0; i < this.population.length; i++) {
    if(Math.random() > chance)
      return;
    console.log("Mutó " + (i + 1));
    this.population[i].mutate();
  }
}

//Evalúa e imprime el fitness de cada individuo en la población
Poblacion.prototype.selection = function() {
  console.log("Selección de Siguiente Población");
  //Imprime toda la población
  for(var i = 0; i < this.population.length; i++) {
    c_gen = '';
    for(var j = 0; j < this.population[i].size; j++){
      c_gen += this.population[i].genotype[j];
    }
    console.log(i + 1 + ") " + c_gen + " - " + this.population[i].getCost()); 
  }
}

//CLASE SOLVER que hará evolucionar nuestro algoritmo genético -------------------------------------->
var Solver = function(pb_size, cr_size, iterations, crossover_prob, crossover_point, mut_prob) {
  //Creamos una nueva población
  this.poblacion = new Poblacion(pb_size, cr_size);
  
  //Copiamos los parámetros útiles
  this.iterations = iterations;
  this.mut_prob = mut_prob;
  this.crossover_prob = crossover_prob;
  this.crossover_point = crossover_point;
};

//Función que realiza las iteraciones para evolucionar nuestro GA
Solver.prototype.evolve = function() {
  for(var i = 0; i < this.iterations; i++) {
    console.log("\n\nIteración: " + i);
    this.poblacion.eval();
    this.poblacion.ruleta(this.crossover_prob, this.crossover_point);
    this.poblacion.mutate(this.mut_prob);
    this.poblacion.selection();
  }
}

function main() {
  console.log("\nrun:");
  
  //Parámetros de la ejecución
  var pob_size = 4,
      cromosoma_size = 5,
      iterations = 1,
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
  console.log("Mutación Simple");
  
  var solver = new Solver(pob_size, cromosoma_size, iterations, crossover_prob, crossover_point, mut_prob);
  solver.evolve();
  
  console.log("\n\nFin del Proceso");
}

main();

//node GA.js
