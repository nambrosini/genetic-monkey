$(function() {
    var target = $('#targetText');
    var popSize = $('#popSize');
    var mutationRate = $('#mutationRate');
    var speed = $('#speed');
    var best = $('#bestMonkey');
    var generationNum = $('#generationNum');
    var averageFitness = $('#averageFitness');
    var phrases = $('#phrases');

    var population;
    var running = false;
    var gNum = 0;
    var interval;
    $('#runButton').click(() => {
        if (!running) {
            running = true;
            gNum = 1;
            population = new Population(target.val(), Number(popSize.val()), Number(mutationRate.val()) / 100);
            run();
        }
    });

    $('#resetButton').click(() => {
        if (running) {
            stop();
        }
        console.log("Reset");
    });

    $('#stopButton').click(() => {
        stop();
    });

    function stop() {
        running = false;
        clearInterval(interval);
    }

    function show() {
        best.html(population.pop[0].genes);
        averageFitness.html(population.averageFitness);
        generationNum.html(gNum);
        phrases.html("");

        var phrs = "";

        for (let i = 1; i < population.pop.length; i++) {
            phrs += '<span>' + population.pop[i].genes + '</span>';
        }

        phrases.html(phrs);
    }

    function run() {
        interval = setInterval(() => {
            runNext();
        }, speed.val());
    }

    function runNext() {
        if (!running) {
            clearInterval(interval);
        }
        show();
        running = population.simulateGeneration();
        gNum++;
    }
});