import * as Yup from 'yup'

export const editUserSchema = Yup.object().shape({

    username: Yup.string().required("Required"),
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Must be in email format").required("Required"),
    password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 5 characters long.'
      ).required("Required"),
    bio: Yup.string().required("Required"),
    profilePicture: Yup.string().url("Must be in url format").required("Required")

});