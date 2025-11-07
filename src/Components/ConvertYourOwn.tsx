/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  Label,
  FileInput,
  Button,
  TextInput,
} from "flowbite-react";
import Navbar from "./Partials/NavBar";
import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import toast, { Toaster } from "react-hot-toast";
import Setting from "../Settings/Setting.json";
let ConvertYourOwn = () => {
  setInterval(() => {
    document.querySelector("html")?.classList.add("dark");
    document.querySelector("body")?.classList.add("dark:bg-gray-800");
  }, 100);

  const [Phone, SetPhone] = useState<any>("");
  const [Name, SetName] = useState<any>("");
  const [ID, SetID] = useState<any>("");
  const [Address, SetAddress] = useState<any>("");
  const [Updates, SetUpdates] = useState<any>("");
  const [Plan, SetPlan] = useState<any>("");
  const [Pay, SetPay] = useState<any>("");
  const [Seller, SetSeller] = useState<any>("");
  const [Date, SetDate] = useState<any>("");
  const [DateOfPay, SetDateOfPay] = useState<any>("");
  const [Paid, SetPaid] = useState<any>("");
  const [Comment, SetComment] = useState<any>("");

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };
  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      if (Phone) {
        formData.append("Number", Phone);
      }
      if (Name) {
        formData.append("Name", Name);
      }
      if (ID) {
        formData.append("id", ID);
      }
      if (Address) {
        formData.append("address", Address);
      }
      if (Updates) {
        formData.append("updates", Updates);
      }
      if (Plan) {
        formData.append("plan", Plan);
      }
      if (Pay) {
        formData.append("pay", Pay);
      }
      if (Seller) {
        formData.append("seller", Seller);
      }
      if (Date) {
        formData.append("date", Date);
      }
      if (DateOfPay) {
        formData.append("dateOfPaid", DateOfPay);
      }
      if (Paid) {
        formData.append("paid", Paid);
      }
      if (Comment) {
        formData.append("comment", Comment);
      }

      fetch(`${Setting.server}/upload`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.status === 403) {
            toast.error("Pleas Fill all Inputs");
          } else {
            toast.success("Done Upload Data...");
          }
        })
        .catch((error) => {
          console.error("There is an Error", error);
        });
    }
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
                required={true}
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
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
                onChange={(e) => SetPhone(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Name" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of ID" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetID(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Address" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetAddress(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Updates" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetUpdates(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Plan" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetPlan(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of pay" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetPay(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Seller" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetSeller(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Date" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetDate(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of DateOfPay" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetDateOfPay(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Paid" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetPaid(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Column of Comment" />
              </div>
              <TextInput
                id="password1"
                required={true}
                className="mb-3"
                onChange={(e) => SetComment(e.target.value)}
              />
            </div>
            <Button onClick={handleUpload}>Submit</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ConvertYourOwn;
