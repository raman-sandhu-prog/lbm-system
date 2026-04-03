const yup=require("yup");

const userschema=yup.object({
    name:yup.string()
    .required("Name is required"),
    email:yup.string().email().required("Email is required"),
    
    
})