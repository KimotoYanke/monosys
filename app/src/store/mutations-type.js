import thingTypes from './thing/mutations-type.json'
import userTypes from './user/mutations-type.json'

function addHeader (types, header) {
    return types.map(mn => header + '/' + mn)
}

export default {
    ...addHeader(thingTypes, 'thing'),
    ...addHeader(userTypes, 'user')
}
