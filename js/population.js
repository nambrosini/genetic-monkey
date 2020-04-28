class Population {
    // Set the needed fields and create the first generation of monkeys randomly.
    constructor(target, popSize, mutationRate) {
        this.popSize = popSize;
        this.mutationRate = mutationRate;
        this.pop = [];
        this.matingPool = [];
        this.averageFitness = 0;

        for (let i = 0; i < popSize; i++) {
            this.pop[i] = new Monkey(target);
        }
        this.calcFitness();
    }

    // Calculates the fitness of every monkey and the average fitness.
    calcFitness() {
        var totalFitness = 0;
        for (let i = 0; i < this.popSize; i++) {
            totalFitness += this.pop[i].calcFitness();
        }

        this.averageFitness = totalFitness / this.popSize;

        // Sorts the monkeys by their fitness to have the best on first and the worst on last.
        this.pop.sort((a, b) => {
            return b.fitness - a.fitness;
        });
    }
    
    mate() {
        this.matingPool = [];
        for (let i = 0; i < this.popSize; i++) {
            // Calculates n by multiplying the fitness * 100, so the better the fitness, the bigger n will be.
            let n = Math.ceil(this.pop[i].fitness * 100);
            // Inserts a certain monkey n times based on her fitness.
            for (let j = 0; j < n; ++j) {
                this.matingPool.push(this.pop[i]);
            }
        }
    }

    // Create a new gen of monkeys. Creates a child from two random monkeys, the monkeys come from the mating pool.
    // The better the fitness, the bigger the chance to be a parent.
    reproduce() {
        for (let i = 0; i < this.popSize; i++) {
            let a = this.getRandomFromMatingPool()
            let b = this.getRandomFromMatingPool();
            let child = a.crossover(b);
            child.mutate(this.mutationRate);
            this.pop[i] = child;
        }
    }

    // Returns a random monkey from the mating pool.
    getRandomFromMatingPool() {
        let index = Math.floor(Math.random() * (this.matingPool.length - 1));
        return this.matingPool[index];
    }

    // Simulates a generation.
    simulateGeneration() {
        this.calcFitness();
        if (this.pop[0].fitness == 1) {
            return false;
        }
        this.mate();
        this.reproduce();
        return true;
    }
}