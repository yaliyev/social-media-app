import * as Yup from 'yup'

export const addPostSchema = Yup.object().shape({
    postTitle: Yup.string().required("Required"),
    postImage: Yup.string().url("Must be in a url format").required("Required")
});