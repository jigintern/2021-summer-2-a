const uniq = (arr) => {
    const e = new Set();
    arr.forEach((a) => e.add(a))
    return Array.from(e);
}

export { uniq }