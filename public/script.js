const { call, docReady } = window.UTILS;

const animateAltParams = {
    duration: 500,
    autoplay: false,
    easing: 'linear',
};

const tracker = {
    currentNodeId: null,
    maxSteps: 0,
    steps: [],
    isGoing: false,
    haveJustInit: function() {
        return this.steps.length <= 1;
    },
    getTrackingArray: function () {
        return this.steps;
    },
    setMaxSteps: function(stepCount) {
        this.maxSteps = stepCount > this.maxSteps ? stepCount : this.maxSteps;
    },
    track: function(nodeId) {
        if (this.steps.length >= this.maxSteps) {
            this.steps.shift();
        }
        this.steps.push(nodeId);
    },
};

const activeCircle = document.querySelector('#active-circle');
const nodeBlue = document.querySelector('#blue');
const nodeGreen = document.querySelector('#green');
const nodeYellow = document.querySelector('#yellow');

const nodes = document.querySelectorAll('.node');

const loader = document.querySelector('#loader');

const URL_RESET = '/api/reset';
const URL_NEXT = '/api/transition'

const getNextURL = nodeId => `${URL_NEXT}/${nodeId}`;

const getActiveAnimate = (node, targetNode) => {
    return anime({
        targets: '#active-circle',
        translateX: [node.getAttribute('cx'), targetNode.getAttribute('cx')],
        translateY: [node.getAttribute('cy'), targetNode.getAttribute('cy')],
        ...animateAltParams,
        begin: (anim) => {
            tracker.isGoing = true;
        },
        complete: (anim) => {
            tracker.isGoing = false;
        },
    });
};

const game = {
    blue: {
        go: {
            green: getActiveAnimate(nodeBlue, nodeGreen),
            yellow: getActiveAnimate(nodeBlue, nodeYellow),
        },
        domNode: nodeBlue,
    },
    green: {
        go: {
            blue: getActiveAnimate(nodeGreen, nodeBlue),
            yellow: getActiveAnimate(nodeGreen, nodeYellow),
        },
        domNode: nodeGreen,
    },
    yellow: {
        go: {
            blue: getActiveAnimate(nodeYellow, nodeBlue),
            green: getActiveAnimate(nodeYellow, nodeGreen),
        },
        domNode: nodeYellow,
    },
};

const showLoader = () => {
    loader.className = 'loader loading';
};
const hideLoader = () => {
    loader.className = 'loader';
};

const nodeClick = (evt) => {
    evt.preventDefault();

    const target = evt.target;
    const nodeId = target.id;

    if (target.getAttribute('class') !== 'node' || tracker.isGoing) {
        return;
    }
    (game[tracker.currentNodeId].go[nodeId]).play();

    // tracking...
    const url = getNextURL(nodeId);
    call(url, tracker.getTrackingArray(), 'POST', showLoader)
        .then(res => {
            hideLoader();
            return res.json();
        })
        .then(json => {
            tracker.currentNodeId = json.current;
            setGameStatus(json);
            tracker.track(nodeId);
        });
};

const setGameStatus = (data = {}) => {
    [...nodes].forEach(node => {
        if (node.id === data.current) {
            node.setAttribute('class', 'node current');
        } else if (Array.isArray(data.next) && data.next.indexOf(node.id) === -1) {
            node.setAttribute('class', 'node disabled');
        } else {
            node.setAttribute('class', 'node');
        }
    });
};

const resetGame = () => {
    call(URL_RESET, null, undefined, showLoader)
        .then(res => {
            hideLoader();
            return res.json();
        })
        .then(json => {
            setGameStatus(json);
            tracker.currentNodeId = json.current;
            Object.values(game[json.current].go)[0].reset();
            // tracking...
            tracker.steps = [json.current];
            tracker.setMaxSteps(json.maxTrackingSteps);
        });
};

docReady(() => {
    // binding the actions
    nodes.forEach(node => {
        node.addEventListener('click', nodeClick);
    });
    // init
    resetGame();

    document.getElementById('reset')
        .addEventListener('click', evt => {
            evt.preventDefault();
            if (tracker.haveJustInit()) {
                return false;
            }
            resetGame();
        });
});