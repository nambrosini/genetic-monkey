class Population {
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

    calcFitness() {
        var totalFitness = 0;
        for (let i = 0; i < this.popSize; i++) {
            totalFitness += this.pop[i].calcFitness();
        }

        this.averageFitness = totalFitness / this.popSize;

        this.pop.sort((a, b) => {
            return b.fitness - a.fitness;
        });
    }

    mate() {
        this.matingPool = [];
        for (let i = 0; i < this.popSize; i++) {
            let n = Math.ceil(this.pop[i].fitness * 100);
            for (let j = 0; j < n; ++j) {
                this.matingPool.push(this.pop[i]);
            }
        }
    }

    reproduce() {
        for (let i = 0; i < this.popSize; i++) {
            let a = this.getRandomFromMatingPool()
            let b = this.getRandomFromMatingPool();
            let child = a.crossover(b);
            child.mutate(this.mutationRate);
            this.pop[i] = child;
        }
    }

    getRandomFromMatingPool() {
        let index = Math.floor(Math.random() * (this.matingPool.length - 1));
        return this.matingPool[index];
    }

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