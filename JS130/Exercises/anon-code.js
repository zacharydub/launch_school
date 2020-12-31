let Account = (function () {
    let userEmail;
    let userPassword;
    let userFirstName;
    let userLastName;

    function isValidPassword(testPassword) {
        return userPassword === testPassword;
    }

    function getRandomLetterNumber() {
        let randomIndex = Math.floor(Math.random() * 62);
        return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ1234567890'[randomIndex];
    }

    function anonymize() {
        let result = '';

        for (let i = 0; i < 16; i += 1) {
            result += getRandomLetterNumber();
        }

        return result;
    }

    return {
        init: function (email, password, firstName, lastName) {
            userEmail = email;
            userPassword = password;
            userFirstName = firstName;
            userLastName = lastName;
            this.displayName = anonymize();
            return this;
        },

        reanonymize: function (password) {
            if (isValidPassword(password)) {
                this.displayName = anonymize();
                return true
            } else {
                return 'Invalid Password';
            }
        },

        resetPassword: function (currentPassword, newPassword) {
            if (isValidPassword(currentPassword)) {
                userPassword = newPassword;
                return true;
            } else {
                return 'Invalid Password';
            }
        },

        firstName: function (password) {
            if (isValidPassword(password)) {
                return userFirstName;
            } else {
                return 'Invalid Password';
            }
        },

        lastName: function (password) {
            if (isValidPassword(password)) {
                return userLastName;
            } else {
                return 'Invalid Password';
            }
        },

        email: function (password) {
            if (isValidPassword(password)) {
                return userEmail;
            } else {
                return 'Invalid Password';
            }
        },
    };
})();