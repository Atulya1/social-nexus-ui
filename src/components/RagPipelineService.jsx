
export async function startOrchestration(payload) {
    const res = await fetch("http://localhost:7071/api/orchestrators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    const { id } = await res.json();              // drop the returned statusQueryGetUri
    return id;
}

export async function pollStatus(instanceId, onUpdate) {
    const statusEndpoint = `http://localhost:7071/api/orchestrationstatus/${instanceId}`;

    while (true) {
        const res = await fetch(statusEndpoint);
        if (!res.ok) throw new Error(await res.text());
        const { runtimeStatus, output } = await res.json();
        onUpdate(runtimeStatus);
        if (runtimeStatus === "Completed") return output;        // <-- already the RAG result
        if (runtimeStatus === "Failed") throw new Error("Orchestration failed");
        await new Promise(r => setTimeout(r, 1000));
    }
}
// export async function startOrchestration(payload) {
//     const orchestrationUrl = process.env.REACT_APP_ORCHESTRATION_URL;
//     const orchestrationKey = process.env.REACT_APP_ORCHESTRATION_KEY;
//
//     const endpoint = orchestrationKey
//         ? `${orchestrationUrl}?code=${orchestrationKey}`
//         : orchestrationUrl;
//
//     const res = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//     });
//
//     if (!res.ok) throw new Error(await res.text());
//     const { id } = await res.json();
//     return id;
// }
//
// export async function pollStatus(instanceId, onUpdate) {
//     const statusUrlBase = process.env.REACT_APP_STATUS_URL;
//     const statusKey = process.env.REACT_APP_STATUS_KEY;
//
//     const statusEndpoint = statusKey
//         ? `${statusUrlBase}/${instanceId}?code=${statusKey}`
//         : `${statusUrlBase}/${instanceId}`;
//
//     while (true) {
//         const res = await fetch(statusEndpoint);
//         if (!res.ok) throw new Error(await res.text());
//         const { runtimeStatus, output } = await res.json();
//         onUpdate(runtimeStatus);
//         if (runtimeStatus === "Completed") return output;
//         if (runtimeStatus === "Failed") throw new Error("Orchestration failed");
//         await new Promise(r => setTimeout(r, 1000));
//     }
// }
