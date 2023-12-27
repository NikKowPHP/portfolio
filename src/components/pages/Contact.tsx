import React, { useRef, useState, useEffect } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import TextTypingEffect from "../TextTypingEffect";
import Panels from "../parts/Panels";
import Footer from "../parts/Footer";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const [previosTextComplete, setPreviosTextComplete] =
    useState<boolean>(false);
  const [completedBlocks, setCompletedBlocks] = useState<number[]>([0]);
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  const panelTexts:string[] = ['nik.kow@outlook.com', 'write to me', 'i\'m available', 'i love coding'];

  useEffect(() => {
    if (previosTextComplete) {
      setTimeout(() => {
        setCurrentTextIndex(currentTextIndex + 1);
        setPreviosTextComplete(false);
      }, 1000);
    }
  }, [previosTextComplete, currentTextIndex]);
  useEffect(() => {
    const formCurrent = form.current;
    if (formCurrent) {
      setTimeout(() => {
        formCurrent.style.transform = "translateY(0)";
      }, 3000);
    }
  }, [form]);

  const handleTypingComplete = (index: number) => {
    setCompletedBlocks((prevBlocks) => [...prevBlocks, index + 1]);
    setPreviosTextComplete(true);
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_2a5v99a",
          "template_eb3m4nu",
          form.current,
          "MBv-C3sqmGh53tFYY"
        )
        .then(
          (result: EmailJSResponseStatus) => {
            console.log(result.text);
          },
          (error: EmailJSResponseStatus) => {
            console.log(error.text);
          }
        );
    }
  };

  const renderForm = () => {
    return (
      <form
        className="flex flex-col translate-y-[250%] transition-all ease-out duration-1000 mb-7"
        ref={form}
        onSubmit={sendEmail}
      >
        <input
          className=" bg-transparent border border-solid border-whiteBlue border-opacity-20 hover:border-opacity-40 focus:border-opacity-60 transition-all duration-300 mb-4 p-4 rounded-lg"
          placeholder="Name"
          type="text"
          name="user_name"
        />
        <input
          className="  bg-transparent border border-solid border-whiteBlue border-opacity-20 hover:border-opacity-40 focus:border-opacity-60 transition-all duration-300 mb-4 p-4 rounded-lg"
          placeholder="Email"
          type="email"
          name="user_email"
        />
        <textarea
          className="  bg-transparent border border-solid border-whiteBlue border-opacity-20 hover:border-opacity-40 focus:border-opacity-60 transition-all duration-300 resize-none mb-4 p-4 rounded-lg min-h-[150px]"
          placeholder="Message"
          name="message"
        />
        <input
          className=" bg-gray-300 text-black p-4 rounded-lg max-w-[200px] cursor-pointer hover:bg-gray-300/70 focus:bg-gray-300/50 transition-all duration-300"
          type="submit"
          value="Send Message"
        />
      </form>
    );
  };

  return (
    <>
      <Panels texts={panelTexts} />
      <div className="content  mt-14 px-5 sm:mt-10 md:mt-24 lg:mt-12 xl:mt-36  relative z-10">
        <div className=" text-white text-center form-header max-w-[1200px] m-auto">
          {completedBlocks.includes(0) && (
            <h1 className=" lg:text-9xl mb-3">
              <TextTypingEffect
                durationInMs={100}
                onComplete={() => handleTypingComplete(0)}
                text="/Contact"
              />
            </h1>
          )}
          <div>
            {completedBlocks.includes(1) && (
              <TextTypingEffect
                durationInMs={50}
                onComplete={() => handleTypingComplete(1)}
                text="Get in touch or shoot me an email directly on  "
              />
            )}
            {completedBlocks.includes(2) && (
              <div className="font-bold text-xl">
                <TextTypingEffect
                  durationInMs={50}
                  onComplete={() => handleTypingComplete(1)}
                  text="nik.kow@outlook.com"
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 md:mt-10 lg:mt-10 xl:mt-10  overflow-hidden text-white m-auto max-w-[570px]">
          {renderForm()}
        </div>
      </div>
      <Footer classes="fixed" />
    </>
  );
};
export default Contact;
