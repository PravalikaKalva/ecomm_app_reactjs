import { useForm } from "react-hook-form";
import "../App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { postLogin } from "../apiCalls";
import { toast } from "react-toastify";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(8).max(15).required(),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const finalSubmission = async (data) => {
    try {
      const response = await postLogin({
        email: data.email,
        password: data.password,
      });
      toast("Login successful!", {
        type: "success",
        theme: "colored",
      });

      const cartID = response.data.cart_id;
      const token = response.data.token;

      localStorage.setItem("ECOMM_CART_ID", cartID);
      localStorage.setItem("ECOMM_TOKEN", token);
      console.log(response);

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000);
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
        <h2>LOGIN</h2>
        <br />

        <form onSubmit={handleSubmit(finalSubmission)}>
          <div>
            <input
              className="inputfield"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>

          <small style={{ color: "red" }}>{errors.email?.message}</small>

          <div>
            <input
              className="inputfield"
              type="text"
              placeholder="Password"
              {...register("password")}
            />
          </div>

          <small style={{ color: "red" }}>{errors.password?.message}</small>
          <br />
          <br />
          <input
            style={{ backgroundColor: "#05f989", fontWeight: "bold" }}
            className="inputfield"
            type="submit"
            value="Login"
          />
        </form>
        <br />

        <span>
          Don't have an account? <a href="./signup">Sign up</a>
        </span>
      </div>
    </div>
  );
};

export default Login;
