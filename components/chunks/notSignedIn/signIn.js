export const SignIn = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[400px] m-auto text-center justify-center h-[100vh]">
      <span className="text-xl font-semibold">
        Санхүүгийн хөтөч руугаа орхоос өмнө заавар нэвтэрнэ үү.
      </span>
      <span className="text-blue-950">{children}</span>
    </div>
  );
};
