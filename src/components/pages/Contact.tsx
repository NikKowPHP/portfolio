import React, { useRef } from "react";
import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import TextTypingEffect from "../TextTypingEffect";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

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
  const handleTypingComplete = () => {};

  const renderForm = () => {
    return (
      <form className="flex flex-col " ref={form} onSubmit={sendEmail}>
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
    <div>
      <div className="mt-16 text-white text-center form-header max-w-[1200px] m-auto">
        <h1 className=" lg:text-9xl ">
          <TextTypingEffect
            durationInMs={100}
            onComplete={handleTypingComplete}
            text="/Contact."
          />
        </h1>
        <div>
          <div className="font-bold">
            <TextTypingEffect
              durationInMs={50}
              onComplete={handleTypingComplete}
              text="Get in touch or shoot me an email directly on  nik.kow@outlook.com"
            />
          </div>
        </div>
      </div>
      <div className="mt-20 text-white m-auto max-w-[570px]">
        {renderForm()}
      </div>
    </div>
  );
};
export default Contact;
