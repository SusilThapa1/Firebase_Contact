import { MdCancel } from "react-icons/md";

const Modal = ({ onClose, isOpen, children }) => {
  return (
    <>
      {isOpen && (
        <>
          <div className="absolute left-1/2 top-1/2 z-20 flex min-h-[30vh] max-w-[360px] -translate-x-1/2 -translate-y-1/2 flex-col gap-2 rounded-md bg-white p-3 text-black">
            <MdCancel
              onClick={onClose}
              className="cursor-pointer self-end text-3xl"
            />

            {children}
          </div>
          <div
            onClick={onClose}
            className="absolute top-0 z-10 h-full w-full backdrop-blur"
          />
        </>
      )}
    </>
  );
};

export default Modal;
