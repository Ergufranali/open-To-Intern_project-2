function isValid(value){
    if (typeof value=== "undefined" || typeof value ===null) return false
    if (typeof value=== "string" &&  value.trim().length===0) return false
    if (typeof value=== "number" &&  value.trim().length===0) return false
    return true
}

let isREgexName = function (attribute) {
    return (/^[a-zA-Z]{2,20}$/.test(attribute.trim()))
}

let regexFullname = function (attribute) {
    return (/^[A-Za-z\s]{1,}[\,]{0,1}[A-Za-z\s]{0,}$/.test(attribute.trim()))
}


const regexIntern = function (name) {
    let regex = /^[A-z]*$|^[A-z]+\s[A-z]*$/

    return regex.test(name)
}

module.exports={isValid}
