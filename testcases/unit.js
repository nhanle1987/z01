const { badRequest } = require("../server/errors");
const { reset, nextStepNoLoop, nextStep } = require("../server/logic");
const NAME_TEST_RESET = "Test the logic of function [RESET]";
const NAME_TEST_NEXT = "Test the logic of function [NEXT]";

module.exports = [
    {
        name: NAME_TEST_RESET,
        description: "[RESET] ✅ function should return initial state (in JSON format)",
        function: reset,
        dataIn: [], // empty / no params
        expectedOutput: {
            status: 200,
            maxTrackingSteps: 2,
            current: 'blue',
            noLoop: 0,
            next: ['yellow', 'green']
        },
    },
    {
        name: NAME_TEST_NEXT,
        description: "[NEXT] ✅ Blue → Yellow (without loop detect)",
        function: nextStep,
        dataIn: ['yellow'], // empty / no params
        expectedOutput: { status: 200, current: 'yellow', noLoop: 2, next: ['blue'] },
    },
    {
        name: NAME_TEST_NEXT,
        description: "[NEXT] ⛔ Green → Yellow (Impossible)",
        function: nextStepNoLoop,
        dataIn: ['yellow', ['Green']], // empty / no params
        expectedOutput: badRequest,
    },
    {
        name: NAME_TEST_NEXT,
        description: "[NEXT] ✅ Blue → Green → Blue → Yellow",
        function: nextStepNoLoop,
        dataIn: ['yellow', ['blue', 'green', 'blue']], // empty / no params
        expectedOutput: {
            "status": 200,
            "current": "yellow",
            "noLoop": 2,
            "next": [
                "blue",
            ],
        },
    },
    {
        name: NAME_TEST_NEXT,
        description: "[NEXT] ✅ Blue → Green → ... → Blue → Green → Blue → Yellow",
        function: nextStepNoLoop,
        dataIn: ['yellow', ['blue', 'green', 'blue']], // empty / no params
        expectedOutput: {
            "status": 200,
            "current": "yellow",
            "noLoop": 2,
            "next": [
                "blue",
            ],
        },
    },
    {
        name: NAME_TEST_NEXT,
        description: "[NEXT] ⛔ Blue → Green → Blue → Yellow (Impossible)",
        function: nextStepNoLoop,
        dataIn: ['yellow', ['blue', 'yellow', 'blue', 'yellow', 'blue']], // empty / no params
        expectedOutput: badRequest,
    },
    {
        name: NAME_TEST_NEXT,
        description: "[NEXT] ⛔ send wrong node type to server (Impossible)",
        function: nextStepNoLoop,
        dataIn: ['xxx', ['blue', 'yellow', 'blue', 'yellow', 'blue']], // empty / no params
        expectedOutput: badRequest,
    },
];
