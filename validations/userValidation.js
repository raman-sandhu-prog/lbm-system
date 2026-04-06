const yup=require("yup");

const userschema=yup.object({
    email:yup.string().email().required("Email is required"),
    password :yup.string().required("Password is required")
  
})
module.exports=userschema;