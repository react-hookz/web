export function on(obj, ...args) {
    if (obj && obj.addEventListener) {
        obj.addEventListener(...args);
    }
}
export function off(obj, ...args) {
    if (obj && obj.removeEventListener) {
        obj.removeEventListener(...args);
    }
}
export const hasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);
export const yieldTrue = () => true;
export const yieldFalse = () => false;
export const basicDepsComparator = (d1, d2) => {
    if (d1 === d2)
        return true;
    if (d1.length !== d2.length)
        return false;
    for (let i = 0; i < d1.length; i++) {
        if (d1[i] !== d2[i]) {
            return false;
        }
    }
    return true;
};
