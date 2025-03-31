import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = () => {

  return (
    <Sonner
      toastOptions={{
        className: "bg-red-800",
        duration: 4000,
        style: {
          backgroundColor: "red"
        },
      }}
    />
  );
};

export default Toaster;