let connect = undefined;

if (typeof window === "undefined") {
    const imported = await import("./node.js");
    console.log("imported =", imported);
    connect = imported.default.connect;
} else {
    const imported = await import("./browser.js");
    connect = imported.default.connect;
}

export default {
    connect
};
