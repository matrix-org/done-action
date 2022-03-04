const core = require('@actions/core');

function main() {
    const needs_param = core.getInput('needs');
    try {
        const needs = JSON.parse(needs_param);
    } catch (error) {
        throw new Error(`Invalid 'needs' input ${needs_param}: ${error.message}`);
    }

    console.debug(`needs: ${JSON.stringify(needs)}`);
    for (const job_id of Object.keys(needs)) {
        const result = needs[job_id].result;
        console.log(`Job ${job_id} returned ${result}`);
        if (result != 'success' && result != 'skipped') {
            throw new Error(`Job ${job_id} returned ${result}`);
        }
    }
}

try {
    main();
} catch (error) {
  core.setFailed(error.message);
}
