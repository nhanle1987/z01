const express = require("express");
const { nextStep, reset, removeNextLoopNode, nextStepNoLoop } = require("./logic");

const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.post("/api/transition/:step", (req, res) => {
    const queryStep = req.params.step;
    let jsonString = '';
    req.on('data', function (data) {
        jsonString += data;
    });
    req.on('end', function () {
        const trackedSteps = JSON.parse(jsonString);
        const { status, msg, noLoop, ...rest } = nextStepNoLoop(queryStep, trackedSteps);
        res.status(status);
        switch (status) {
            case 400:
                res.json(msg);
                break;
            default:
                res.json(rest);
                break;
        }
    });
});
app.get("/api/reset", (req, res) => {
    const { status, ...rest } = reset();
    res
        .status(status)
        .json(rest);
});

app.use(express.static('public'))
app.use('/jquery', express.static(__dirname + '/../node_modules/jquery/dist')); // redirect CSS bootstrap
app.use('/animejs', express.static(__dirname + '/../node_modules/animejs/lib')); // redirect CSS bootstrap
