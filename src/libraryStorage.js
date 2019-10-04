export function setStoredLibrary(discs) {
    localStorage.setItem("discLibrary", JSON.stringify(discs));
    return discs;
}

export function removeStoredDisc(disc) {
    const library = JSON.parse(localStorage.getItem("discLibrary"));
    const newLibrary = library.filter(el => el.id !== disc.id);
    setStoredLibrary(newLibrary);
    console.log(newLibrary);
    return newLibrary;
}

export function getStoredLibrary() {
    const library = JSON.parse(localStorage.getItem("discLibrary"));
    if (!library) {
        return setStoredLibrary([]);
    } else {
        return library;
    }
}