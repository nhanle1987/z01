const errors = require("./errors");
const { defaultNode, list, maxTrackingSteps } = require("./rules");

const logic = {
    removeNextLoopNode: (trackingSteps, nextNodes) => {
        return nextNodes.filter(node => {
            const { noLoop } = list[node];
            if (noLoop <= 0) {
                return true;
            }
            return trackingSteps.indexOf(node) === -1;
        });
    },
    nextStepNoLoop: (stepId, trackedSteps) => {
        const nextStep = logic.nextStep(stepId, trackedSteps);
        if (nextStep.status !== 200) {
            return nextStep;
        }
        nextStep.next = logic.removeNextLoopNode(trackedSteps, nextStep.next);
        return nextStep;
    },
    nextStep: (stepId, trackedSteps) => {
        const id = `${stepId}`.toLowerCase();
        if (!stepId) {
            return errors.badRequest;
        }
        const keys = Object.keys(list);
        if (keys.indexOf(id) === -1) {
            return errors.badRequest;
        }
        if (Array.isArray(trackedSteps) && trackedSteps.length > 0) {
            // latest node?
            const latestNode = trackedSteps[trackedSteps.length - 1];
            const latestNodeRule = list[latestNode];
            if (!latestNodeRule) {
                return errors.badRequest;
            }
            if (latestNodeRule.next.indexOf(stepId) === -1) {
                return errors.badRequest;
            }
            
            const nextNodeRule = list[stepId];
            if (nextNodeRule.noLoop > 0 && trackedSteps.indexOf(stepId) !== -1) {
                return errors.badRequest;
            }
        }
        return ({
            status: 200,
            current: stepId,
            ...list[stepId],
        });
    },
    reset: () => {
        return ({
            status: 200,
            maxTrackingSteps,
            current: defaultNode,
            ...list[defaultNode],
        });
    },
};
module.exports = logic;