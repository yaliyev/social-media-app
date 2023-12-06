import * as Yup from 'yup'

export const registerUserSchema = Yup.object().shape({
     // username, password, email, confirmPassword, isPublic checkbox, fullName
    username: Yup.string().min(3).required("Required"),
    password: Yup.string().matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 5 characters long.'
      ).required("Required"),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
      email: Yup.string().email("Must be in email format").required("Required"),
      fullName: Yup.string().required("Required")
});