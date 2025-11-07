import { useEffect, useState } from "react";
import { Card, Label, Button } from "flowbite-react";
import Navbar from "./Partials/NavBar";
import Setting from "../Settings/Setting.json"
let Search = () => {
  setInterval(() => {
    document.querySelector("html")?.classList.add("dark");
    document.querySelector("body")?.classList.add("dark:bg-gray-800");
  }, 100);
  let [Data, SetData] = useState<string[]>();
  let [Value, SetValue] = useState<string>();
  let [SearchExist, SetSearchExist] = useState(false);
  useEffect(() => {
    fetch(`${Setting.server}/users`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then(async (users) => {
      let Res = await users.json();
      SetData(Res);
    });
  }, []);
  let handleChange = (e: any) => {
    SetValue(e.target.value);
    if (e.target.value === "") {
      SetSearchExist(false);
      e.target.classList.add("rounded-br-lg", "rounded-bl-lg")
    } else {
      SetSearchExist(true);
      e.target.classList.remove("rounded-br-lg", "rounded-bl-lg")
    }
  };

  let handleSelect = (e: any) => {
    SetValue(e.target.innerText);
    SetSearchExist(false)
    document.getElementById("password1")?.classList.add("rounded-br-lg", "rounded-bl-lg")

  }
  let handleCommand = (key: string, i: number) => {
    return (
      <div key={i} className="relative z-50 left-0 right-0 text-white hover:bg-slate-600 text-right cursor-pointer rounded-md p-2" onClick={handleSelect}>
                      {key}
                    </div>
    )
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center my-64">
        <Card>
          <form className="flex flex-col gap-4">
            <div className="relative inline-block">
              <div className="mb-2 block">
                <Label htmlFor="User" value="UserName" />
              </div>
              <input
                id="password1"
                required={true}
                className="mb-3 w-80 rounded-tr-lg outline-none rounded-tl-lg block border-0 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 p-2.5 text-sm rounded-br-lg rounded-bl-lg shadow"
                onChange={handleChange}
                value={Value|| ""}
                placeholder="UserName"
              />
              {SearchExist ? (
                <div className=" line-clamp-1 border-t-1 border-white -top-3 mr-6 ml-6 relative z-50"></div>
              ) : null}
            </div>
            {SearchExist ? (
              <div className="pt-2 pb-2 rounded-br-lg rounded-bl-lg relative z-40 top--7 left-0 right-0 shadow-md border-0 bg-gray-700">
                {Data?.map((key, i) => 
                  key.includes(Value as string) ? handleCommand(key, i) : null
                )}
              </div>
            ) : null}
            <Button onClick={(e) => {
    document.location.pathname = "/users/"+ Value
  }}>Submit</Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Search;
