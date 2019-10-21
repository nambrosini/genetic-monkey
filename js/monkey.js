class Monkey {
    constructor(target) {
        this.target = target;
        this.genes = [];
        this.fitness = 0;
        for (let i = 0; i < this.target.length; i++) {
            this.genes[i] = getRandomChar();
        }
    }

    calcFitness() {
        let score = 0;
        for (let i = 0; i < this.target.length; i++) {
            if (this.genes[i] === this.target[i]) {
                score++;
            }
        }
        this.fitness = score / this.target.length;
        return this.fitness;
    }

    crossover(partner) {
        let child = new Monkey(this.target);
        let midpoint = Math.floor(Math.random() * (this.target.length - 1));
        for (let i = 0; i < this.target.length; i++) {
            if (i > midpoint) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }

    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (Math.random() < mutationRate) {
                this.genes[i] = getRandomChar();
            }
        }
    }
}

function getRandomChar() {
    return String.fromCharCode(32 + secureMathRandom() * (128 - 32));
}

// A more secure way to get a random number
function secureMathRandom() {
    // Divide a random UInt32 by the maximum value (2^32 -1) to get a result between 0 and 1
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295;
  }