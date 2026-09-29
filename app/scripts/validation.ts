const existingNames: string[] = ['Tomato Soup', 'Buns']

export const validateUniqueName = (name: string) => {

    // TODO: getting actual existingNames
    return !existingNames.some(existingName =>
        existingName.toLowerCase() === name.toLowerCase()
    );
}

export const validateCookingTime = (time: string) => {
    const format = /^(\d+h \d+m|\d+m)$/
    return format.test(time.trim())
}

export const validateNumber = (portions: string) => {
    return !isNaN(parseFloat(portions.trim()));
}