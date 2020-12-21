export const buildGuidJsonMap = (elementsById) => {
    return Object.keys(elementsById).reduce((result, id) => {
        if (elementsById[id].origineId === undefined) {
            return result;
        } else if (elementsById[id].origineId !== elementsById[id].id ) {
            return ({...result, [elementsById[id].origineId] : elementsById[id].id});
        } else {
            return result;
        }
    }, {});
}