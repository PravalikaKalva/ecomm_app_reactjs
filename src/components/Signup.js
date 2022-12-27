import { useForm } from "react-hook-form";
import "../App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { type } from "@testing-library/user-event/dist/type";
import { postSignUp } from "../apiCalls";

const schema = yup
  .object({
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(15).required(),
    confirmpassword: yup.string().min(8).max(15).required(),
  })
  .required();

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const finalSubmission = async (data) => {
    if (data.password != data.confirmpassword) {
      toast("Passwords are not matching", {
        type: "error",
        theme: "colored",
      });
      return;
    }

    try {
      const response = await postSignUp(data);
      toast("You've registered successfully! Login now ", {
        type: "success",
        theme: "colored",
      });
      console.log(response);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.log(error);
      const message = error?.response?.data?.message || "Something went wrong";
      toast(message, {
        type: "error",
        theme: "colored",
      });
    }
  };

  return (
    <div className="split-screen">
      <img
        src="https://www.monsterinsights.com/wp-content/uploads/2019/11/breathtaking-online-shopping-statistics-you-never-knew-625x300.png.webp"
        alt=""
        width="800"
      />
      <div className="form">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit(finalSubmission)}>
          <input
            className="inputfield"
            type="text"
            placeholder="UserName"
            {...register("userName")}
          />
          <br />
          <small style={{ color: "red" }}>{errors.userName?.message}</small>
          <input
            className="inputfield"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <br />
          <small style={{ color: "red" }}>{errors.email?.message}</small>
          <input
            className="inputfield"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <br />
          <small style={{ color: "red" }}>{errors.password?.message}</small>
          <input
            className="inputfield"
            type="password"
            placeholder="Confirm Password"
            {...register("confirmpassword")}
          />
          <small style={{ color: "red" }}>
            {errors.confirmpassword?.message}
          </small>
          <br /> <br />
          <input
            style={{ backgroundColor: "#05f989", fontWeight: "bold" }}
            className="inputfield"
            type="submit"
            value="Sign up"
          />
        </form>
        <br />

        <span>
          Already have an account? <a href="./login">Login</a>
        </span>
        {/* <button type="submit">Login</button> */}
      </div>
    </div>
  );
};

export default Signup;
