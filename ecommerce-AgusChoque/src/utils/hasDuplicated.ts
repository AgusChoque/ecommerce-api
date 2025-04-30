export function hasDuplicated(array: { id: string }[]): boolean {
    const seen = new Set();

    for(const item of array) {
        if(seen.has(item.id)) return true;
        seen.add(item.id);
    }

    return false;
};