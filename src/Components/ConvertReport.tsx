import { useState } from "react";
import { Card, Label, FileInput, Button, TextInput } from "flowbite-react";
import Navbar from "./Partials/NavBar";
import Setting from "../Settings/Setting.json";
import toast, { Toaster } from "react-hot-toast";
let ConvertReport = () => {
  setInterval(() => {
    document.querySelector("html")?.classList.add("dark");
    document.querySelector("body")?.classList.add("dark:bg-gray-800");
  }, 100);
  let [file, setFile] = useState<File>();
  let [Number, setNumber] = useState<any>();
  let [paid, SetPaid] = useState<any>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };

  let handleSubmit = () => {
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    }
    if (Number) {
      formData.append("Number", Number);
    }
    if (paid) {
      formData.append("paid", paid);
    }

    fetch(`${Setting.server}/upload/report`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status === 403) {
          toast.error("Pleas Fill all Inputs", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast.success("Done Upload Data...", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((error) => {
        console.error("There is an Error", error);
      });
  };
  return (
    <>
      <Navbar />
      <Toaster position="bottom-right" />
      <div className="flex justify-center items-center my-64">
        <Card>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="New Excel" />
              </div>
              <FileInput
                id="password1"
                required={true}
                onChange={handleFileChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Phone Number" />
              </div>
              <TextInput
                id="password1"
                required={true}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Paid Amount" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetPaid(e.target.value)}
              />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ConvertReport;
