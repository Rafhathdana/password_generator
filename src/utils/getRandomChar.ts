export function getRandomChar(min: number, max: number): string {
    const range = max - min + 1; //total number of characters in the specified range
    const randomIndex = Math.floor(Math.random() * range);  //get random index between the range
    const randomChar = String.fromCharCode(randomIndex + min); // add minimum value to randomIndex generated
    return randomChar;
}

/**
 * Generates a random special character from the predefined list of special characters.
 * list = !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'
 * @returns {string} The randomly generated special character.
 */
export function getSpecialChar() {
    const specialChar = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~'";
    const randomIndex = Math.floor(Math.random() * specialChar.length);
    const randomChar = specialChar[randomIndex];
    return randomChar;
}