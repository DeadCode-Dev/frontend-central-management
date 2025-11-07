import {
  Card,
  Label,
  Button,
  FileInput,
  TextInput,
  Modal,
} from "flowbite-react";
import { useEffect, useState } from "react";
import Nav from "./Partials/NavBar";
import Setting from "../Settings/Setting.json";
import toast, { Toaster } from "react-hot-toast";
const Mix = () => {
  useEffect(() => {
    document.querySelector("html")?.classList.add("dark");
    document.querySelector("body")?.classList.add("dark:bg-gray-800");
  }, []);

  const [file, setFile] = useState<File>();
  const [file2, setFile2] = useState<File>();
  const [excel, setExcel] = useState({ Number: 0, Amount: 0 });
  const [newExcel, setNewExcel] = useState({ Number: 0, Amount: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    }
  };
  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile2(selectedFile);
    }
  };

  const handleEditExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExcel((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditNewExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewExcel((prevData) => ({ ...prevData, [name]: value }));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    console.log(excel, newExcel, [file, file2]);
    const formData = new FormData();
    if (excel && newExcel && file && file2) {
      formData.append("file", file);
      formData.append("file2", file2);
      formData.append("excel", JSON.stringify(excel));
      formData.append("newexcel", JSON.stringify(newExcel));
    }
    fetch(`${Setting.server}/upload/mix`, {
      method: "POST",
      body: formData,
    })
      .then(async (response) => {
        if (response.status === 403) {
          toast.error("Pleas Fill all Inputs");
        } else {
          setUrl(await response.text());
          openModal();
          toast.success("Done Upload Data...");
        }
      })
      .catch((error) => {
        console.error("There is an Error", error);
      });
  };

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center my-64">
        <Modal onClose={closeModal} show={isOpen}>
          <Modal.Header>Download</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <Button href={Setting.server + url}>Download</Button>
            </div>
          </Modal.Body>
        </Modal>
        <Toaster />
        <Card>
          <form className="flex flex-col gap-4">
            <div className="relative inline-block">
              <div className="mb-2 block">
                <Label htmlFor="excelFile" value="Excel File" />
                <FileInput id="excelFile" onChange={handleFileChange} />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="excelNumber" value="Excel Number" />
                <TextInput
                  id="excelNumber"
                  name="Number"
                  onChange={handleEditExcel}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="excelAmount" value="Excel Amount" />
                <TextInput
                  id="excelAmount"
                  name="Amount"
                  onChange={handleEditExcel}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="newExcelFile" value="New Excel File" />
                <FileInput id="newExcelFile" onChange={handleFileChange2} />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="newExcelNumber" value="New Excel Number" />
                <TextInput
                  id="newExcelNumber"
                  name="Number"
                  onChange={handleEditNewExcel}
                />
              </div>
              <div className="mb-2 block">
                <Label htmlFor="newExcelAmount" value="New Excel Amount" />
                <TextInput
                  id="newExcelAmount"
                  name="Amount"
                  onChange={handleEditNewExcel}
                />
              </div>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Mix;
