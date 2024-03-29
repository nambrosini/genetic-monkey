$(function() {
    // Jquery fields
    var target = $('#targetText');
    var popSize = $('#popSize');
    var mutationRate = $('#mutationRate');
    var speed = $('#speed');
    var best = $('#bestMonkey');
    var generationNum = $('#generationNum');
    var averageFitness = $('#averageFitness');
    var computationPerSecond = $('#compPerSec');
    var mutationRateLabel = $('#mutationRateLabel');
    var popSizeLabel = $('#popSizeLabel');
    var phrases = $('#phrases');
    var nPhrases = $('#nPhrases');

    var population;
    var running = false;
    // The generation count
    var gNum = 0;
    var interval;
    var hasEnded = true;

    // Run button click
    $('#runButton').click(() => {
        if (hasEnded) {
            init();
        }
        run();
    });

    $('#resetButton').click(() => {
        if (running || hasEnded) {
            stop();
        }
        hasEnded = true;
        // Reset html fields showing the stats.
        best.html("Best Monkey");
        averageFitness.html("");
        generationNum.html("");
        phrases.html("");
    });

    $('#stopButton').click(() => {
        stop();
    });

    $('#stepButton').click(() => {
        if (hasEnded) {
            init();
        }
        runNext();
    });

    function stop() {
        running = false;
        clearInterval(interval);
    }

    // Shows the stats on the user interface
    function show() {
        best.html(population.pop[0].genes);
        averageFitness.html(population.averageFitness);
        generationNum.html(gNum);
        phrases.html("");

        var phrs = "";

        for (let i = 1; i < population.pop.length && i < nPhrases.val(); i++) {
            phrs += '<span>' + population.pop[i].genes.join("") + '</span>';
        }

        phrases.html(phrs);
    }

    function run() {
        // An interval to compute a generation after some time.
        interval = setInterval(() => {
            runNext();
        }, 1000 / Number(speed.val()));
    }

    function init() {
        running = true;
        hasEnded = false;
        gNum = 1;
        // Init new population
        population = new Population(target.val(), Number(popSize.val()), Number(mutationRate.val()) / 100);
        // Init the user interface
        computationPerSecond.html(1000 / (1000 / Number(speed.val())));
        mutationRateLabel.html(mutationRate.val());
        popSizeLabel.html(popSize.val());
    }

    function runNext() {
        if (hasEnded) {
            clearInterval(interval);
            running = false;
        }
        show();
        hasEnded = !population.simulateGeneration();
        gNum++;
    }
});