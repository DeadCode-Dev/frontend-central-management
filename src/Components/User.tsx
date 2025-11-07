/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Label, Button, TextInput, Table } from "flowbite-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Phones } from "../Types/Phones";
import Setting from "../Settings/Setting.json";
import Nav from "./Partials/NavBar";
import toast, { Toaster } from "react-hot-toast";

const User = () => {
  useEffect(() => {
    document.querySelector("html")?.classList.add("dark");
    document.querySelector("body")?.classList.add("dark:bg-gray-800");
  }, []);

  const [users, setUsers] = useState<Phones[]>([]);
  const [editable, setEditable] = useState(false);
  const params = useParams<{ Name: string }>();

  useEffect(() => {
    fetch(`${Setting.server}/get/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Name: params.Name,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        setUsers(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [params.Name]);

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, tabIndex } = e.target;
    setUsers((prevUsers) => {
      if (prevUsers) {
        const index = parseInt(tabIndex.toString(), 10);
        if (!isNaN(index) && index >= 0 && index < prevUsers.length) {
          const updatedUser = {
            ...prevUsers[index],
            [name]: value,
          };
          const updatedUsers = [...prevUsers];
          updatedUsers[index] = updatedUser;
          return updatedUsers;
        }
      }
      return prevUsers;
    });
  };

  const handleChange = () => {
    setEditable(true);
  };

  const handleSave = () => {
    fetch(`${Setting.server}/edit/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        Data: users,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          toast.success("Done Save Changes!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast.error("There is an Error", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
        const data = await res.json();
        setUsers(data);
      })
      .catch((e) => {
        console.error(e);
      });
    setEditable(false);
  };

  const handleAdd = () => {
    setUsers((prev) => [
      ...prev,
      {
        Name: params.Name as string,
        Number: "",
        address: "",
        comment: "",
        date: "",
        dateOfPaid: "",
        ID: "",
        paid: "",
        pay: "",
        plan: "",
        seller: "",
        updates: "",
      },
    ]);
  };

  const handleDelete = (name: string, number: string) => {
    fetch(`${Setting.server}/delete/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        Number: number,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          toast.success("Done Delete Data...", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        } else {
          toast.error("There is An Error", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
console.log(users)
  return (
    <>
      <Nav />
      <hr className="my-4 border-t-2 border-gray-300" />
      <h3 className="text-xl text-white text-center font-bold">
        {params.Name}
      </h3>
      <hr className="my-4 border-t-2 border-gray-300" />
      <div className="flex justify-end mr-10">
        <Button onClick={handleAdd}>Add PhoneNumber</Button>
      </div>
      <Toaster position="bottom-right" />
      {!editable ? (
        <div className="overflow-x-auto my-8">
          <Table className="w-full table-auto">
            <Table.Head>
              <Table.HeadCell>name</Table.HeadCell>
              <Table.HeadCell>Number</Table.HeadCell>
              <Table.HeadCell>id</Table.HeadCell>
              <Table.HeadCell>address</Table.HeadCell>
              <Table.HeadCell>updates</Table.HeadCell>
              <Table.HeadCell>plan</Table.HeadCell>
              <Table.HeadCell>seller</Table.HeadCell>
              <Table.HeadCell>date</Table.HeadCell>
              <Table.HeadCell>pay</Table.HeadCell>
              <Table.HeadCell>dateOfPaid</Table.HeadCell>
              <Table.HeadCell>paid</Table.HeadCell>
              <Table.HeadCell>comment</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user: any, i) => (
                <Table.Row
                  key={i}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 max-w-full"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.Number}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.ID}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.address}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.updates}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.plan}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.seller}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.date}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.pay}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.dateOfPaid}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.paid}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    {user.comment}
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={handleChange}>Edit</Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <div className="overflow-x-auto my-8">
          <Table className="w-full table-auto">
            <Table.Head>
              <Table.HeadCell>name</Table.HeadCell>
              <Table.HeadCell>Number</Table.HeadCell>
              <Table.HeadCell>id</Table.HeadCell>
              <Table.HeadCell>address</Table.HeadCell>
              <Table.HeadCell>updates</Table.HeadCell>
              <Table.HeadCell>plan</Table.HeadCell>
              <Table.HeadCell>seller</Table.HeadCell>
              <Table.HeadCell>date</Table.HeadCell>
              <Table.HeadCell>pay</Table.HeadCell>
              <Table.HeadCell>dateOfPaid</Table.HeadCell>
              <Table.HeadCell>paid</Table.HeadCell>
              <Table.HeadCell>comment</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user: any, i) => (
                <Table.Row
                  key={i}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800 max-w-full"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="name"
                      value={user.name}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="Number"
                      value={user.Number}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="ID"
                      value={user.ID}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="address"
                      value={user.address}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="updates"
                      value={user.updates}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="plan"
                      value={user.plan}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="seller"
                      value={user.seller}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="date"
                      value={user.date}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="pay"
                      value={user.pay}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="dateOfPaid"
                      value={user.dateOfPaid}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="paid"
                      value={user.paid}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white w-1/12">
                    <TextInput
                      name="comment"
                      value={user.comment}
                      tabIndex={i}
                      onChange={handleEdit}
                    />
                  </Table.Cell>
                  {!editable ? (
                    <Table.Cell>
                      <Button onClick={handleChange}>Edit</Button>
                    </Table.Cell>
                  ) : (
                    <>
                      <Table.Cell>
                        <Button onClick={(e) => handleDelete(user.name, user.Number)}>Delete</Button>
                      </Table.Cell>
                      <Table.Cell>
                        <Button onClick={handleSave}>Save</Button>
                      </Table.Cell>
                    </>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </>
  );
};

export default User;
