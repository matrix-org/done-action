import { getInput, getMultilineInput, setFailed } from "@actions/core";

function parseJsonInput(param_name: string) {
    const param_val = getInput(param_name);
    try {
        return JSON.parse(param_val);
    } catch (error) {
        throw new Error(
            `Invalid '${param_name}' input ${param_val}: ${(error as Error).message}`,
        );
    }
}

function main() {
    const needs = parseJsonInput("needs");
    const skippable = getMultilineInput("skippable");

    console.debug(`needs: ${JSON.stringify(needs)}`);
    console.debug(`skippable: ${JSON.stringify(skippable)}`);
    for (const job_id of Object.keys(needs)) {
        const result = needs[job_id].result;
        console.log(`Job ${job_id} returned ${result}`);
        if (result == "skipped" && skippable.includes(job_id)) {
            continue;
        }
        if (result != "success") {
            throw new Error(`Job ${job_id} returned ${result}`);
        }
    }
}

try {
    main();
} catch (error) {
    setFailed((error as Error).message);
}
