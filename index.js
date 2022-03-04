const core = require('@actions/core');

function parseJsonInput(param_name) {
    const param_val = core.getInput(param_name);
    try {
        return JSON.parse(param_val);
    } catch (error) {
        throw new Error(`Invalid '${param_name}' input ${param_val}: ${error.message}`);
    }
}


function main() {
    const needs = parseJsonInput('needs');
    const skippable = core.getMultilineInput('skippable');

    console.debug(`needs: ${JSON.stringify(needs)}`);
    console.debug(`skippable: ${JSON.stringify(skippable)}`);
    for (const job_id of Object.keys(needs)) {
        const result = needs[job_id].result;
        console.log(`Job ${job_id} returned ${result}`);
        if (result == 'skipped' && skippable.includes(job_id)) {
            continue;
        }
        if (result != 'success') {
            throw new Error(`Job ${job_id} returned ${result}`);
        }
    }
}

try {
    main();
} catch (error) {
  core.setFailed(error.message);
}
