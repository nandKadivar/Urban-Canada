import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";
import icon from "../../assets/icon.jpg";
import { useNavigate } from "react-router-dom";

// const userData = JSON.parse(localStorage.getItem("userData"));



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// function for header
export default function Header(props) {

  const [user, setUser] = useState({}); // User state
  const [loading, setLoading] = useState(true); // Loading state
  const [userData,setUserData] = useState(JSON.parse(localStorage.getItem("userData")))
  // console.log(userData)
  // navigation menu for guest.
  const guestNavigation = [
    { name: "Home", href: "/" },
    { name: "Login/SignUp", href: "/login" },
  ];


  // navigation menu for service provider.

var providerNavigation = [
  { name: "Home", href: "/" },
  { name: "Service Posting", href: "/ServicePosting" },
  { name: "My Bookings", href: "/MyBookings" },
  { name: "Ratings", href: `/rating` },
];

if(JSON.parse(localStorage.getItem("userData")) != null){
  providerNavigation = [
    { name: "Home", href: "/" },
    { name: "Service Posting", href: "/serviceposting" },
    { name: "My Bookings", href: "/vendor_bookings" },
    { name: "My Ratings", href: `/rating/${userData._id}` },
  ];
}


const consumerNavigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/Services" },
  { name: "My Bookings", href: "/MyBookings" },

];

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        setUser(userData);
        setLoading(false);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    } else {
      console.error("No user data in local storage.");
    }
  }, []);

  const navigate = useNavigate();
  const [loggedInUser,setLoggedInUser] = useState("guest")
  const { currentPage } = props;

  useEffect(()=>{
    const loggedin_user = localStorage.getItem("userData")

    if(loggedin_user){
      const user_object = JSON.parse(loggedin_user)
      setLoggedInUser(user_object.role)
    }
  },[])

  console.log(loggedInUser)

  // set navigation according to user.
  var navigation = guestNavigation;

  if(loggedInUser == "service-consumer"){
     navigation = consumerNavigation;
  }

  if (loggedInUser == "service-provider") {
     navigation = providerNavigation;
  }

  const updatedNavigation = navigation.map((item) => {
    if (item.href === currentPage) {
      return { ...item, current: true };
    }

    return { ...item, current: false };
  });

  //signout function
  const handleSignOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const handleProfileNavigation = () => {
    window.location.href = "/profile";
  };
  
  return (
    <div className="sticky top-0 bg-gray-800 z-50">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-full">
              <div className="relative flex h-24 items-center justify-between mx-3">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>

                  {
                    loggedInUser == "service-consumer" || loggedInUser == "service-provider" ?

                    <div className="text-white font-medium text-base ml-2 mr-20">
                      Welcome {user.firstName} {user.lastName}!
                    </div> :

                    <div className="text-white font-medium text-base ml-2 mr-20">
                      Welcome to Urban Canada
                    </div>
                  }
                </div>

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img className="hidden h-12 w-18 lg:block" src={logo} />
                  </div>

                  <div className="hidden sm:ml-6 mt-2 sm:block">
                    <div className="flex space-x-1 ">
                      {updatedNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 no-underline text-white"
                              : "text-gray-300 no-underline hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>                

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {
                    loggedInUser == "service-consumer" || loggedInUser == "service-provider" ?

                    <div className="hidden sm:block text-white font-medium text-lg mr-3">
                      Welcome {user.firstName} {user.lastName}!
                    </div> :

                    <div className="hidden sm:block text-white font-medium text-lg mr-3">
                      Welcome to Urban Canada
                    </div>
                  }
                  
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-9 w-9 rounded-full"
                          src={icon}
                          alt=""
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      {
                    loggedInUser == "service-consumer" || loggedInUser == "service-provider" ?

                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={handleProfileNavigation}
                              className={classNames(
                                active ? "bg-gray-200" : "",
                                "block no-underline px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              onClick={handleSignOut}
                              className={classNames(
                                active ? "bg-gray-200" : "",
                                "block no-underline px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                      :

                      <div></div>
                    }
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 no-underline text-white"
                        : "text-gray-300 no-underline hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}