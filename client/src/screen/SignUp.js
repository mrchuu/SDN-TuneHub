import { FormControl, TextField } from "@mui/material";
import { BsSoundwave } from "react-icons/bs";
export default function SignUp() {
  
  return (
    <div
      className={`w-full h-screen bg-[url('https://media.istockphoto.com/id/1409692700/vector/podcasting-audio-sound-wave-abstract-background.jpg?s=612x612&w=0&k=20&c=MDK7p1D1LP3QQoOL-WxfxFmsXxir1m6SNhuBMRXQL5A=')] bg-cover bg-center`}
    >
      <div className="absolute inset-0 backdrop-filter backdrop-brightness-75 flex-col justify-center items-center">
        <div className="flex justify-center items-center brightness-125">
          <BsSoundwave color="#ff5e3a" size={60} />
          <h3 className="text-textSecondary font-bold text-3xl">Tune</h3>
          <h3 className="text-OrangePrimary font-bold text-3xl">Hub</h3>
        </div>
        <div className="bg-zinc-700 lg:w-6/12 w-9/12 h-5/6 bg-opacity-40 rounded-xl brightness-150 mx-auto">
          <div className="px-6">
            <h1 className="text-OrangePrimary font-semibold text-2xl opacity-100">
              Create your account
            </h1>
            <FormControl style={{ marginTop: "20px" }} className="w-full">
              <div className="flex justify-between">
                <TextField
                  required
                  label="First Name"
                  color="error"
                  borderColor="white"
                />
                <TextField
                  required
                  label="Last Name"
                  style={{ color: "white", borderColor: "white", width: "48%" }}
                  // className="w-6/12"
                />
              </div>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}
