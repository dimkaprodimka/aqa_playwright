export const users = {
    // correct creds for login
    user1: {
        name: 'Emma',
        lastname: 'Adams',
        email: 'aqa-emmaa@gmail.com',
        password: 'Emma_Pass123',
        repeat_password: 'Emma_Pass123'
    },

    // Name and Lastname contain special symbols
    user2: {
        name: 'Peter12@',
        lastname: 'Cooper34&',
        email: 'aqa-peterc@gmail.com',
        password: 'Peter_Pass123',
        repeat_password: 'Peter_Pass123'
    },

    // Invalid Email Format
    user3: {
        name: 'Mia',
        lastname: 'Richardson',
        email: 'aqa-miargmail.com',
        password: 'Mia_Pass123',
        repeat_password: 'Mia_Pass123'
    },

    // Weak Password
    user4: {
        name: 'Mike',
        lastname: 'Sanders',
        email: 'aqa-mikes@gmail.com',
        password: 'Pass1',
        repeat_password: 'Pass1'
    },

    // Non-matching passwords
    user5: {
        name: 'Julia',
        lastname: 'Foster',
        email: 'aqa-julaif@gmail.com',
        password: 'Julia_Pass123',
        repeat_password: 'Julia_Pass456'
    },

    // Empty creds
    user6: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        repeat_password: ''
    }
}
