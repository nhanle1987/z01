const NAME_TEST_API_RESET = "[RESET API]";
const NAME_TEST_API_NEXT = "[NEXT API]";
const HOST = 'http://localhost:3000';

module.exports = {
    host: HOST,
    tests: [
        {
            name: NAME_TEST_API_RESET,
            description: '[RESET] should return initial state',
            url: '/api/reset',
            body: null,
            expectedResponseData: { status: 200, data: { "maxTrackingSteps": 2, "current": "blue", "next": ["yellow", "green"], "noLoop": 0 } },
        },
        {
            name: NAME_TEST_API_NEXT,
            description: "[NEXT] ⛔ Green → Yellow (Impossible)",
            url: '/api/transition/yellow',
            body: ['green'],
            expectedResponseData: { status: 400, data: 'invalid parameter(s)' },
        },
        {
            name: NAME_TEST_API_NEXT,
            description: "[NEXT] ✅ Blue → Green → Blue → Yellow",
            url: '/api/transition/yellow',
            body: ['blue', 'green', 'blue'],
            expectedResponseData: { status: 200, data: {
                "current": "yellow",
                "next": [
                    "blue",
                ],
            } },
        },
        {
            name: NAME_TEST_API_NEXT,
            description: "[NEXT] ✅ Blue → Green → ... → Blue → Green → Blue → Yellow",
            url: '/api/transition/yellow',
            body: ['blue', 'green', 'blue'],
            expectedResponseData: { status: 200, data: {
                "current": "yellow",
                "next": [
                    "blue",
                ],
            } },
        },
        {
            name: NAME_TEST_API_NEXT,
            description: "[NEXT] ⛔ Blue → Green → Blue → Yellow (Impossible)",
            url: '/api/transition/yellow',
            body: ['blue', 'yellow', 'blue', 'yellow', 'blue'],
            expectedResponseData:  { status: 400, data: 'invalid parameter(s)' },
        },
        {
            name: NAME_TEST_API_NEXT,
            description: "[NEXT] ⛔ send wrong node type to server (Impossible)",
            url: '/api/transition/adsfasdf',
            body: ['blue', 'yellow', 'blue', 'yellow', 'blue'],
            expectedResponseData:  { status: 400, data: 'invalid parameter(s)' },
        },
    ]
};
