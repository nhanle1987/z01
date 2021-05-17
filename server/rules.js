const BLUE = 'blue', GREEN = 'green', YELLOW = 'yellow';
const MAX_TRACKING_STEPS = 2;

module.exports = {
    defaultNode: BLUE,
    maxTrackingSteps: MAX_TRACKING_STEPS,
    list: {
        blue: {
            noLoop: 0,
            next: [YELLOW, GREEN],
        },
        green: {
            noLoop: 0,
            next: [BLUE],
        },
        yellow: {
            noLoop: 2,
            next: [BLUE],
        }
    }
};