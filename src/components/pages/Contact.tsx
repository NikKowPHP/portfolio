import React, { useRef } from "react";
import emailjs, {EmailJSResponseStatus} from "@emailjs/browser";


interface EmailSendResult {
  text: string;
}

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
          (result: EmailJSResponseStatus<EmailSendResult>) => {
            console.log(result.text);
          },
          (error: EmailJSResponseStatus<EmailSendResult>) => {
            console.log(error.text);
          }
        );
    }
  };

  const renderForm = () => {
    return (
      <form className="flex flex-col " ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input className="text-black" type="text" name="user_name" />
        <label>Email</label>
        <input className="text-black" type="email" name="user_email" />
        <label>Message</label>
        <textarea className="text-black" name="message" />
        <input className="mt-2 bg-gray-300" type="submit" value="Send" />
      </form>
    );
  };
  return (
    <div>
      <div className="mt-20 text-white ">{renderForm()}</div>
    </div>
  );
};
export default Contact;
